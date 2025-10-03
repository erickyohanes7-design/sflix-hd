// app/sitemap.js
import {
  getMovieGenres,
  getMoviesByCategory,
  getTvSeriesByCategory,
  getTvSeriesGenres,
  getMoviesByGenre,
  getTvSeriesByGenre
} from '../lib/api';

const BASE_URL = 'https://sflix-watch.vercel.app';

// Fungsi utilitas untuk membuat slug
const createSlug = (name, year) => {
  if (!name) return '';
  
  const baseSlug = name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim();

  // Validasi tahun lebih ketat
  if (!year || typeof year !== 'string' || year.length !== 4 || isNaN(year)) {
    return baseSlug;
  }
  
  return `${baseSlug}-${year}`;
};

// Timeout helper untuk mencegah hanging requests
const withTimeout = (promise, timeout = 8000) => {
  return Promise.race([
    promise,
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Request timeout')), timeout)
    )
  ]);
};

// Safe fetch function dengan error handling
const safeFetch = async (fetchFunction, ...args) => {
  try {
    return await withTimeout(fetchFunction(...args));
  } catch (error) {
    console.warn(`Fetch failed for ${fetchFunction.name}:`, error.message);
    return [];
  }
};

export default async function sitemap() {
  const movieCategories = ['popular', 'now_playing', 'upcoming', 'top_rated'];
  const tvCategories = ['popular', 'airing_today', 'on_the_air', 'top_rated'];

  try {
    console.log('Fetching data for sitemap...');

    // Ambil genres dengan error handling
    const [movieGenres, tvGenres] = await Promise.allSettled([
      safeFetch(getMovieGenres),
      safeFetch(getTvSeriesGenres)
    ]).then(results => 
      results.map(result => result.status === 'fulfilled' ? result.value : [])
    );

    console.log(`Movie genres: ${movieGenres.length}, TV genres: ${tvGenres.length}`);

    // Ambil semua film dari semua kategori (halaman 1 saja)
    const movieCategoryPromises = movieCategories.map(async (category) => {
      return await safeFetch(getMoviesByCategory, category, 1);
    });
    
    // Ambil semua film dari semua genre (halaman 1 saja)
    const movieGenrePromises = (movieGenres || []).slice(0, 5).map(async (genre) => { // Batasi genre untuk menghindari terlalu banyak request
      return await safeFetch(getMoviesByGenre, genre.id, 1);
    });

    // Ambil semua serial TV dari semua kategori (halaman 1 saja)
    const tvCategoryPromises = tvCategories.map(async (category) => {
      return await safeFetch(getTvSeriesByCategory, category, 1);
    });

    // Ambil semua serial TV dari semua genre (halaman 1 saja)
    const tvGenrePromises = (tvGenres || []).slice(0, 5).map(async (genre) => { // Batasi genre untuk menghindari terlalu banyak request
      return await safeFetch(getTvSeriesByGenre, genre.id, 1);
    });

    // Gabungkan semua hasil pengambilan data dengan Promise.allSettled
    const [
      movieCategoryResults, 
      movieGenreResults, 
      tvCategoryResults, 
      tvGenreResults
    ] = await Promise.allSettled([
      Promise.all(movieCategoryPromises),
      Promise.all(movieGenrePromises),
      Promise.all(tvCategoryPromises),
      Promise.all(tvGenrePromises)
    ]).then(results => 
      results.map(result => 
        result.status === 'fulfilled' ? result.value.flat().filter(item => item?.id) : []
      )
    );

    // Gabungkan semua film dan serial TV
    const allMovies = [...movieCategoryResults, ...movieGenreResults].flat();
    const allTvShows = [...tvCategoryResults, ...tvGenreResults].flat();

    // Gunakan Map untuk menyimpan ID unik agar tidak ada duplikasi URL
    const uniqueMovies = new Map();
    allMovies.forEach(movie => {
      if (movie?.id && movie?.title) {
        uniqueMovies.set(movie.id, movie);
      }
    });

    const uniqueTvShows = new Map();
    allTvShows.forEach(tvShow => {
      if (tvShow?.id && tvShow?.name) {
        uniqueTvShows.set(tvShow.id, tvShow);
      }
    });

    console.log(`Number of unique films: ${uniqueMovies.size}`);
    console.log(`Number of unique TV series: ${uniqueTvShows.size}`);
    
    // Batasi jumlah URL untuk menghindari sitemap yang terlalu besar
    const maxMovies = Math.min(uniqueMovies.size, 1000); // Maksimal 1000 film
    const maxTvShows = Math.min(uniqueTvShows.size, 1000); // Maksimal 1000 TV series

    // Buat URL statis, kategori, dan genre
    const staticUrls = [
      { url: `${BASE_URL}/`, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
      { url: `${BASE_URL}/trending`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
      { url: `${BASE_URL}/adult/adult-movies`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
      { url: `${BASE_URL}/adult/erotic-movies`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    ];

    const movieCategoryUrls = movieCategories.map((category) => ({
      url: `${BASE_URL}/movie/${category}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8
    }));

    const tvCategoryUrls = tvCategories.map((category) => ({
      url: `${BASE_URL}/tv-show/${category}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8
    }));
    
    const movieGenreUrls = (movieGenres || []).slice(0, 10).map((genre) => ({
      url: `${BASE_URL}/movie/genre-${genre.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7
    }));
    
    const tvGenreUrls = (tvGenres || []).slice(0, 10).map((genre) => ({
      url: `${BASE_URL}/tv-show/genre-${genre.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7
    }));

    // Batasi jumlah URL film dan TV series
    const limitedMovies = Array.from(uniqueMovies.values()).slice(0, maxMovies);
    const limitedTvShows = Array.from(uniqueTvShows.values()).slice(0, maxTvShows);

    // Buat URL slug film dari data yang sudah ada
    const movieSlugUrls = limitedMovies.map((movie) => {
      const year = movie.release_date?.substring(0, 4);
      return {
        url: `${BASE_URL}/movie/${createSlug(movie.title, year)}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6
      };
    });

    const movieStreamUrls = limitedMovies.map((movie) => {
      const year = movie.release_date?.substring(0, 4);
      return {
        url: `${BASE_URL}/movie/${createSlug(movie.title, year)}/stream`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6
      };
    });

    // Buat URL slug serial TV dari data yang sudah ada
    const tvSlugUrls = limitedTvShows.map((tvShow) => {
      const year = tvShow.first_air_date?.substring(0, 4);
      return {
        url: `${BASE_URL}/tv-show/${createSlug(tvShow.name, year)}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6
      };
    });

    const tvStreamUrls = limitedTvShows.map((tvShow) => {
      const year = tvShow.first_air_date?.substring(0, 4);
      return {
        url: `${BASE_URL}/tv-show/${createSlug(tvShow.name, year)}/stream`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6
      };
    });

    const allUrls = [
      ...staticUrls,
      ...movieCategoryUrls,
      ...tvCategoryUrls,
      ...movieGenreUrls,
      ...tvGenreUrls,
      ...movieSlugUrls,
      ...movieStreamUrls,
      ...tvSlugUrls,
      ...tvStreamUrls,
    ];

    console.log(`Total URLs in sitemap: ${allUrls.length}`);
    console.log('Sitemap created successfully');

    return allUrls;

  } catch (error) {
    console.error("Error while creating sitemap:", error);
    
    // Return minimal sitemap dengan URL utama jika error
    return [
      { url: `${BASE_URL}/`, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
      { url: `${BASE_URL}/trending`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
      { url: `${BASE_URL}/adult/adult-movies`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
      { url: `${BASE_URL}/adult/erotic-movies`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    ];
  }
}