// api.jsx

const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const apiUrl = process.env.NEXT_PUBLIC_TMDB_API_URL;

// Fungsi helper untuk fetch data dengan caching yang tepat
const fetchApi = async (path, options = {}) => {
  if (!apiKey || !apiUrl) {
    throw new Error('API keys are not configured. Please check your .env.local file.');
  }

  const url = `${apiUrl}${path}?api_key=${apiKey}&language=en-US`;
  
  // Default cache options - sesuaikan berdasarkan use case
  const defaultOptions = {
    next: { 
      revalidate: 3600, // Default: cache 1 jam
      tags: ['tmdb-data'] 
    }
  };

  try {
    const res = await fetch(url, {
      ...defaultOptions,
      ...options,
    });

    if (!res.ok) {
      // Handle specific HTTP errors
      if (res.status === 404) {
        throw new Error(`Resource not found: ${path}`);
      }
      if (res.status === 401) {
        throw new Error('Invalid API key');
      }
      if (res.status === 429) {
        throw new Error('Rate limit exceeded');
      }
      
      const errorData = await res.json().catch(() => ({}));
      throw new Error(`API Error (${res.status}): ${errorData.status_message || res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error(`Fetch error for ${path}:`, error);
    throw error;
  }
};

// Fungsi untuk data yang perlu real-time (short cache)
const fetchWithShortCache = async (path, options = {}) => {
  return fetchApi(path, {
    next: { revalidate: 300 }, // 5 menit untuk data trending
    ...options
  });
};

// Fungsi untuk data yang jarang berubah (long cache)
const fetchWithLongCache = async (path, options = {}) => {
  return fetchApi(path, {
    next: { revalidate: 86400 }, // 24 jam untuk data static
    ...options
  });
};

// ========== FUNGSI DETAIL (Long Cache) ==========
// Data detail film/series jarang berubah

export async function getMovieById(movieId) {
  try {
    console.log(`Fetching movie details for ID: ${movieId}`);
    const data = await fetchWithLongCache(`/movie/${movieId}`);
    
    if (!data || data.success === false) {
      console.warn(`Movie with ID ${movieId} not found or unavailable`);
      return null;
    }
    
    console.log(`Successfully fetched movie: ${data.title} (ID: ${movieId})`);
    return data;
  } catch (error) {
    console.error(`Error fetching movie details for ID ${movieId}:`, error);
    return null;
  }
}

export async function getTvSeriesById(tvId) {
  try {
    console.log(`Fetching TV series details for ID: ${tvId}`);
    const data = await fetchWithLongCache(`/tv/${tvId}`);
    
    if (!data || data.success === false) {
      console.warn(`TV series with ID ${tvId} not found or unavailable`);
      return null;
    }
    
    console.log(`Successfully fetched TV series: ${data.name} (ID: ${tvId})`);
    return data;
  } catch (error) {
    console.error(`Error fetching TV series details for ID ${tvId}:`, error);
    return null;
  }
}

export async function getMovieCredits(movieId) {
  try {
    const data = await fetchWithLongCache(`/movie/${movieId}/credits`);
    return data;
  } catch (error) {
    console.error(`Error fetching movie credits for ID ${movieId}:`, error);
    return { cast: [], crew: [] };
  }
}

export async function getTvSeriesCredits(tvId) {
  try {
    const data = await fetchWithLongCache(`/tv/${tvId}/credits`);
    return data;
  } catch (error) {
    console.error(`Error fetching TV series credits for ID ${tvId}:`, error);
    return { cast: [], crew: [] };
  }
}

// ========== FUNGSI DYNAMIC (Short Cache) ==========
// Data yang sering berubah seperti video, reviews

export async function getMovieVideos(movieId) {
  try {
    const data = await fetchWithShortCache(`/movie/${movieId}/videos`);
    return data.results || [];
  } catch (error) {
    console.error(`Error fetching movie videos for ID ${movieId}:`, error);
    return [];
  }
}

export async function getTvSeriesVideos(tvId) {
  try {
    const data = await fetchWithShortCache(`/tv/${tvId}/videos`);
    return data.results || [];
  } catch (error) {
    console.error(`Error fetching TV series videos for ID ${tvId}:`, error);
    return [];
  }
}

export async function getMovieReviews(movieId) {
  try {
    const data = await fetchWithShortCache(`/movie/${movieId}/reviews`);
    return data.results || [];
  } catch (error) {
    console.error(`Error fetching movie reviews for ID ${movieId}:`, error);
    return [];
  }
}

export async function getTvSeriesReviews(tvId) {
  try {
    const data = await fetchWithShortCache(`/tv/${tvId}/reviews`);
    return data.results || [];
  } catch (error) {
    console.error(`Error fetching TV series reviews for ID ${tvId}:`, error);
    return [];
  }
}

// ========== FUNGSI LIST/CATEGORY (Medium Cache) ==========
// Data list film/series dengan cache sedang

export async function getMoviesByCategory(category, page = 1) {
  try {
    const data = await fetchApi(`/movie/${category}?page=${page}`);
    return data.results || [];
  } catch (error) {
    console.error(`Error fetching ${category} movies:`, error);
    return [];
  }
}

export async function getTvSeriesByCategory(category, page = 1) {
  try {
    const data = await fetchApi(`/tv/${category}?page=${page}`);
    return data.results || [];
  } catch (error) {
    console.error(`Error fetching ${category} TV series:`, error);
    return [];
  }
}

export async function getSimilarMovies(movieId) {
  try {
    const data = await fetchApi(`/movie/${movieId}/similar`);
    return data.results || [];
  } catch (error) {
    console.error(`Error fetching similar movies for ID ${movieId}:`, error);
    return [];
  }
}

export async function getSimilarTvSeries(tvId) {
  try {
    const data = await fetchApi(`/tv/${tvId}/similar`);
    return data.results || [];
  } catch (error) {
    console.error(`Error fetching similar TV series for ID ${tvId}:`, error);
    return [];
  }
}

// PERBAIKAN: Tambahkan fungsi getMoviesByGenre yang missing
export async function getMoviesByGenre(genreId, page = 1) {
  try {
    console.log(`Fetching movies by genre ID: ${genreId}, page: ${page}`);
    const data = await fetchApi(`/discover/movie?with_genres=${genreId}&page=${page}`);
    console.log(`Movies by genre result:`, data.results?.length || 0);
    return data.results || [];
  } catch (error) {
    console.error(`Error fetching movies by genre ID ${genreId}:`, error);
    return [];
  }
}

export async function getTvSeriesByGenre(genreId, page = 1) {
  try {
    console.log(`Fetching TV series by genre ID: ${genreId}, page: ${page}`);
    const data = await fetchApi(`/discover/tv?with_genres=${genreId}&page=${page}`);
    console.log(`TV series by genre result:`, data.results?.length || 0);
    return data.results || [];
  } catch (error) {
    console.error(`Error fetching TV series by genre ID ${genreId}:`, error);
    return [];
  }
}

// ========== FUNGSI TRENDING/SEARCH (Short Cache) ==========
// Data yang sangat dinamis

export async function getTrendingMoviesDaily(page = 1) {
  try {
    const data = await fetchWithShortCache(`/trending/movie/day?page=${page}`);
    return data.results || [];
  } catch (error) {
    console.error('Error fetching daily trending movies:', error);
    return [];
  }
}

export async function getTrendingTvSeriesDaily(page = 1) {
  try {
    const data = await fetchWithShortCache(`/trending/tv/day?page=${page}`);
    return data.results || [];
  } catch (error) {
    console.error('Error fetching daily trending TV series:', error);
    return [];
  }
}

// PERBAIKAN: Enhanced search function dengan better filtering
export async function searchMoviesAndTv(query, page = 1) {
  try {
    console.log(`Searching for: "${query}", page: ${page}`);
    const data = await fetchWithShortCache(`/search/multi?query=${encodeURIComponent(query)}&page=${page}&include_adult=false`);
    
    if (!data.results) return [];
    
    // Filter out adult content dan items tanpa poster
    const filteredResults = data.results.filter(item => 
      item && 
      !item.adult &&
      (item.media_type === 'movie' || item.media_type === 'tv') &&
      (item.poster_path || item.backdrop_path)
    );
    
    console.log(`Search results for "${query}":`, filteredResults.length);
    return filteredResults;
  } catch (error) {
    console.error(`Error fetching search results for query '${query}':`, error);
    return [];
  }
}

// FUNGSI BARU: Search by ID sebagai fallback
export async function searchMovieById(movieId) {
  try {
    console.log(`Searching movie by ID: ${movieId}`);
    // Coba ambil detail langsung
    const movie = await getMovieById(movieId);
    if (movie) return [movie];
    
    // Fallback: search by ID pattern (jarang diperlukan)
    const data = await fetchWithShortCache(`/search/movie?query=${movieId}`);
    return data.results || [];
  } catch (error) {
    console.error(`Error searching movie by ID ${movieId}:`, error);
    return [];
  }
}

export const getMovieByTitle = async (title) => {
  try {
    console.log(`Searching movie by title: "${title}"`);
    const data = await fetchWithShortCache(`/search/movie?query=${encodeURIComponent(title)}&include_adult=false`);
    
    if (!data.results || data.results.length === 0) {
      console.log(`No movies found for title: "${title}"`);
      return null;
    }
    
    // Filter out adult content
    const filteredResults = data.results.filter(movie => !movie.adult);
    console.log(`Movies found for "${title}":`, filteredResults.length);
    return filteredResults.length > 0 ? filteredResults : null;
  } catch (error) {
    console.error(`Error fetching movie by title: "${title}"`, error);
    return null;
  }
};

export const getTvSeriesByTitle = async (title) => {
  try {
    console.log(`Searching TV series by title: "${title}"`);
    const data = await fetchWithShortCache(`/search/tv?query=${encodeURIComponent(title)}&include_adult=false`);
    
    if (!data.results || data.results.length === 0) {
      console.log(`No TV series found for title: "${title}"`);
      return null;
    }
    
    console.log(`TV series found for "${title}":`, data.results.length);
    return data.results;
  } catch (error) {
    console.error(`Error fetching TV series by title: "${title}"`, error);
    return null;
  }
};

// ========== FUNGSI STATIC (Very Long Cache) ==========
// Data yang sangat jarang berubah

export async function getMovieGenres() {
  try {
    const data = await fetchWithLongCache('/genre/movie/list');
    return data.genres || [];
  } catch (error) {
    console.error('Error fetching movie genres:', error);
    return [];
  }
}

export async function getTvSeriesGenres() {
  try {
    const data = await fetchWithLongCache('/genre/tv/list');
    return data.genres || [];
  } catch (error) {
    console.error('Error fetching TV series genres:', error);
    return [];
  }
}

// ========== FUNGSI ADULT CONTENT (Medium Cache) ==========

export async function getMoviesByKeyword(keywordId = 256466, page = 1) {
  try {
    console.log(`Fetching movies by keyword: ${keywordId}, page: ${page}`);
    const data = await fetchApi(`/discover/movie?with_keywords=${keywordId}&page=${page}`);
    console.log(`Movies by keyword result:`, data.results?.length || 0);
    return data.results || [];
  } catch (error) {
    console.error(`Error fetching movies by keyword ID ${keywordId}:`, error);
    return [];
  }
}

export async function getMoviesByList(listId = "143347", page = 1) {
  try {
    console.log(`Fetching movies from list: ${listId}, page: ${page}`);
    const data = await fetchApi(`/list/${listId}?page=${page}`);
    console.log(`Movies from list result:`, data.items?.length || 0);
    return data.items || [];
  } catch (error) {
    console.error(`Error fetching movies from list ID ${listId}:`, error);
    return [];
  }
}

// FUNGSI BARU: Validasi movie data
export const validateMovieData = (movieData) => {
  if (!movieData) return false;
  if (movieData.success === false) return false;
  if (!movieData.id) return false;
  if (!movieData.title && !movieData.name) return false;
  return true;
};

// Fungsi untuk membuat slug dari judul
export const createSlug = (title, releaseDate = '') => {
  if (!title) return '';
  
  const baseSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '') // Hapus karakter tidak valid
    .replace(/\s+/g, '-') // Ganti spasi dengan dash
    .replace(/-+/g, '-') // Gabungkan multiple dash
    .trim();

  const year = releaseDate ? releaseDate.substring(0, 4) : '';
  return year ? `${baseSlug}-${year}` : baseSlug;
};

// Export khusus untuk sitemap dengan caching yang lebih agresif
export const sitemapFetchApi = async (path) => {
  const url = `${apiUrl}${path}?api_key=${apiKey}&language=en-US`;
  
  const res = await fetch(url, {
    next: { 
      revalidate: 86400, // 24 jam untuk sitemap
      tags: ['sitemap'] 
    }
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch ${path}`);
  }

  return res.json();
};

// FUNGSI BARU: Health check API
export const checkApiHealth = async () => {
  try {
    const data = await fetchWithShortCache('/configuration');
    return { healthy: true, data };
  } catch (error) {
    console.error('API Health check failed:', error);
    return { healthy: false, error: error.message };
  }
};