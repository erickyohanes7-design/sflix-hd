// api.jsx - SOLUSI PINTAR HYBRID

const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const apiUrl = process.env.NEXT_PUBLIC_TMDB_API_URL;

// ✅ Cache untuk track duplicate judul+tahun dalam SESI SEKARANG
let currentSessionDuplicates = new Set();

// Fungsi helper untuk fetch data
const fetchApi = async (path, options = {}) => {
  if (!apiKey || !apiUrl) {
    throw new Error('API keys are not configured. Please check your .env.local file.');
  }

  const url = `${apiUrl}${path}?api_key=${apiKey}&language=en-US`;
  const res = await fetch(url, {
    cache: 'no-store', // Memastikan data selalu baru
    ...options,
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(`API Error: ${errorData.status_message}`);
  }

  return res.json();
};

// ===== FUNGSI SLUG MANAGEMENT PINTAR =====

// ✅ Fungsi untuk detect duplicates dalam array movies
export const detectDuplicates = (movies) => {
  const titleYearMap = new Map();
  const duplicates = new Set();
  
  if (!movies || !Array.isArray(movies)) return duplicates;
  
  movies.forEach(item => {
    const title = item.title || item.name;
    const year = item.release_date?.split('-')[0] || item.first_air_date?.split('-')[0];
    
    if (!title || !year) return;
    
    const key = `${title.toLowerCase()}-${year}`;
    
    if (titleYearMap.has(key)) {
      // ✅ INI DUPLICATE: tambahkan ke set duplicates
      duplicates.add(key);
      console.log(`🔔 [DUPLICATE] Found duplicate: ${title} (${year})`);
    } else {
      titleYearMap.set(key, { title, year });
    }
  });
  
  // Update cache global
  currentSessionDuplicates = duplicates;
  console.log(`📊 [DUPLICATE] Total duplicates detected: ${duplicates.size}`);
  return duplicates;
};

// ✅ SOLUSI PINTAR: Generate slug hybrid
export const generateDetailSlug = (item) => {
  const title = item.title || item.name || 'movie';
  const year = item.release_date?.split('-')[0] || item.first_air_date?.split('-')[0] || '0000';
  const id = item.id;
  
  if (!title || !year) {
    return `movie-${id}`;
  }
  
  // Bersihkan judul
  const cleanTitle = title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .trim();
  
  const key = `${title.toLowerCase()}-${year}`;
  
  // ✅ PINTAR: Cek apakah judul+tahun ini duplicate
  if (currentSessionDuplicates.has(key)) {
    // ✅ JIKA DUPLICATE: tambahkan ID
    console.log(`🔔 [SLUG] Duplicate detected: "${title}" (${year}), adding ID: ${id}`);
    return `${cleanTitle}-${year}-${id}`;
  } else {
    // ✅ JIKA TIDAK DUPLICATE: cukup judul-tahun
    console.log(`✅ [SLUG] Unique film: "${title}" (${year}), no ID needed`);
    return `${cleanTitle}-${year}`;
  }
};

// ✅ Untuk kompatibilitas dengan kode existing
export const generateSlug = generateDetailSlug;

// ✅ SOLUSI PINTAR: Parse slug yang handle kedua format
export const parseSlug = (slug) => {
  if (!slug) return { title: '', year: null, id: null, hasId: false };
  
  const parts = slug.split('-');
  
  // ✅ Format 1: judul-tahun-id (ada duplicate)
  if (parts.length >= 3) {
    const lastPart = parts[parts.length - 1];
    const secondLastPart = parts[parts.length - 2];
    
    if (!isNaN(lastPart) && !isNaN(secondLastPart)) {
      const id = parseInt(lastPart);
      const year = parseInt(secondLastPart);
      const titleParts = parts.slice(0, -2);
      const title = titleParts.join('-');
      
      return { title, year, id, hasId: true };
    }
  }
  
  // ✅ Format 2: judul-tahun (tidak ada duplicate)
  if (parts.length >= 2) {
    const lastPart = parts[parts.length - 1];
    
    if (!isNaN(lastPart)) {
      const year = parseInt(lastPart);
      const titleParts = parts.slice(0, -1);
      const title = titleParts.join('-');
      
      return { title, year, id: null, hasId: false };
    }
  }
  
  // Fallback
  return { title: slug, year: null, id: null, hasId: false };
};

// ✅ SOLUSI PINTAR: Fetch media item yang handle kedua format
export const fetchMediaItem = async (slug, mediaType = 'movie') => {
  console.log(`🔍 [PINTAR] Fetching ${mediaType} for slug:`, slug);
  
  const { title, year, id, hasId } = parseSlug(slug);
  
  console.log(`📋 [PINTAR] Parsed:`, { title, year, id, hasId });
  
  // ✅ PRIORITY 1: Jika slug mengandung ID, langsung fetch by ID
  if (hasId && id) {
    console.log(`🎯 [PINTAR] Fetching by ID: ${id}`);
    try {
      if (mediaType === 'movie') {
        const movie = await getMovieById(id);
        if (movie) {
          console.log(`✅ [PINTAR] Movie found by ID:`, movie.title);
          return movie;
        }
      } else {
        const tvShow = await getTvSeriesById(id);
        if (tvShow) {
          console.log(`✅ [PINTAR] TV show found by ID:`, tvShow.name);
          return tvShow;
        }
      }
    } catch (error) {
      console.error(`❌ [PINTAR] Error fetching by ID:`, error);
    }
  }
  
  // ✅ PRIORITY 2: Jika tidak ada ID, search by title+year
  if (title && year) {
    console.log(`🔎 [PINTAR] Searching: "${title}" (${year})`);
    
    try {
      let searchResults = [];
      
      if (mediaType === 'movie') {
        const searchUrl = `/search/movie?query=${encodeURIComponent(title)}&year=${year}`;
        const data = await fetchApi(searchUrl);
        searchResults = data.results || [];
      } else {
        const searchUrl = `/search/tv?query=${encodeURIComponent(title)}&first_air_date_year=${year}`;
        const data = await fetchApi(searchUrl);
        searchResults = data.results || [];
      }
      
      console.log(`📊 [PINTAR] Search results:`, searchResults.length);
      
      // ✅ Filter exact match
      const exactMatches = searchResults.filter(item => {
        const itemTitle = item.title || item.name;
        const itemYear = item.release_date?.split('-')[0] || item.first_air_date?.split('-')[0];
        
        return itemTitle.toLowerCase() === title.toLowerCase() && 
               itemYear === year.toString();
      });
      
      if (exactMatches.length > 0) {
        console.log(`✅ [PINTAR] Exact match found:`, exactMatches[0].title || exactMatches[0].name);
        if (mediaType === 'movie') {
          return await getMovieById(exactMatches[0].id);
        } else {
          return await getTvSeriesById(exactMatches[0].id);
        }
      }
      
      // Jika tidak ada exact match, ambil pertama
      if (searchResults.length > 0) {
        console.log(`⚠️ [PINTAR] Using first result:`, searchResults[0].title || searchResults[0].name);
        if (mediaType === 'movie') {
          return await getMovieById(searchResults[0].id);
        } else {
          return await getTvSeriesById(searchResults[0].id);
        }
      }
    } catch (error) {
      console.error(`❌ [PINTAR] Search error:`, error);
    }
  }
  
  // ✅ PRIORITY 3: Fallback ke search multi (untuk kompatibilitas)
  if (title) {
    console.log(`🔀 [PINTAR] Fallback search: "${title}"`);
    try {
      const searchResults = await searchMoviesAndTv(title);
      const filteredResults = searchResults.filter(item => 
        item.media_type === mediaType
      );
      
      if (filteredResults.length > 0) {
        console.log(`🔀 [PINTAR] Fallback result:`, filteredResults[0].title || filteredResults[0].name);
        if (mediaType === 'movie') {
          return await getMovieById(filteredResults[0].id);
        } else {
          return await getTvSeriesById(filteredResults[0].id);
        }
      }
    } catch (error) {
      console.error(`❌ [PINTAR] Fallback search error:`, error);
    }
  }
  
  console.log(`❌ [PINTAR] No ${mediaType} found for slug: ${slug}`);
  return null;
};

// ✅ Untuk kompatibilitas dengan kode existing
export const fetchMovieBySlug = fetchMediaItem;

// ===== FUNGSI API EXISTING (TETAP SAMA) =====

// Fungsi untuk mendapatkan film berdasarkan ID
export async function getMovieById(movieId) {
  try {
    const data = await fetchApi(`/movie/${movieId}`);
    return data;
  } catch (error) {
    console.error(`Error fetching movie details for ID ${movieId}:`, error);
    return null;
  }
}

// Fungsi untuk mendapatkan serial TV berdasarkan ID
export async function getTvSeriesById(tvId) {
  try {
    const data = await fetchApi(`/tv/${tvId}`);
    return data;
  } catch (error) {
    console.error(`Error fetching TV series details for ID ${tvId}:`, error);
    return null;
  }
}

// Fungsi untuk mendapatkan video (trailer) film
export async function getMovieVideos(movieId) {
  try {
    const data = await fetchApi(`/movie/${movieId}/videos`);
    return data.results;
  } catch (error) {
    console.error(`Error fetching movie videos for ID ${movieId}:`, error);
    return [];
  }
}

// Fungsi untuk mendapatkan video (trailer) serial TV
export async function getTvSeriesVideos(tvId) {
  try {
    const data = await fetchApi(`/tv/${tvId}/videos`);
    return data.results;
  } catch (error) {
    console.error(`Error fetching TV series videos for ID ${tvId}:`, error);
    return [];
  }
}

// Fungsi untuk mendapatkan kredit (aktor dan kru) film
export async function getMovieCredits(movieId) {
  try {
    const data = await fetchApi(`/movie/${movieId}/credits`);
    return data;
  } catch (error) {
    console.error(`Error fetching movie credits for ID ${movieId}:`, error);
    return null;
  }
}

// Fungsi untuk mendapatkan ulasan film
export async function getMovieReviews(movieId) {
  try {
    const data = await fetchApi(`/movie/${movieId}/reviews`);
    return data.results;
  } catch (error) {
    console.error(`Error fetching movie reviews for ID ${movieId}:`, error);
    return [];
  }
}

// Fungsi untuk mendapatkan kredit (aktor dan kru) serial TV
export async function getTvSeriesCredits(tvId) {
  try {
    const data = await fetchApi(`/tv/${tvId}/credits`);
    return data;
  } catch (error) {
    console.error(`Error fetching TV series credits for ID ${tvId}:`, error);
    return null;
  }
}

// Fungsi untuk mendapatkan ulasan serial TV
export async function getTvSeriesReviews(tvId) {
  try {
    const data = await fetchApi(`/tv/${tvId}/reviews`);
    return data.results;
  } catch (error) {
    console.error(`Error fetching TV series reviews for ID ${tvId}:`, error);
    return [];
  }
}

// Fungsi untuk mencari film atau serial TV berdasarkan query
export async function searchMoviesAndTv(query, page = 1) {
  try {
    const data = await fetchApi(`/search/multi?query=${encodeURIComponent(query)}&page=${page}`);
    return data.results;
  } catch (error) {
    console.error(`Error fetching search results for query '${query}':`, error);
    return [];
  }
}

// Fungsi untuk mendapatkan film berdasarkan kategori
export async function getMoviesByCategory(category, page = 1) {
  try {
    const data = await fetchApi(`/movie/${category}?page=${page}`);
    return data.results;
  } catch (error) {
    console.error(`Error fetching ${category} movies:`, error);
    return [];
  }
}

// Fungsi untuk mendapatkan serial TV berdasarkan kategori
export async function getTvSeriesByCategory(category, page = 1) {
  try {
    const data = await fetchApi(`/tv/${category}?page=${page}`);
    return data.results;
  } catch (error) {
    console.error(`Error fetching ${category} TV series:`, error);
    return [];
  }
}

// Fungsi untuk mendapatkan film serupa
export async function getSimilarMovies(movieId) {
  try {
    const data = await fetchApi(`/movie/${movieId}/similar`);
    return data.results;
  } catch (error) {
    console.error(`Error fetching similar movies for ID ${movieId}:`, error);
    return [];
  }
}

// Fungsi untuk mendapatkan serial TV serupa
export async function getSimilarTvSeries(tvId) {
  try {
    const data = await fetchApi(`/tv/${tvId}/similar`);
    return data.results;
  } catch (error) {
    console.error(`Error fetching similar TV series for ID ${tvId}:`, error);
    return [];
  }
}

// Fungsi untuk mencari film berdasarkan judul
export const getMovieByTitle = async (title) => {
    try {
        const data = await fetchApi(`/search/movie?query=${encodeURIComponent(title)}`);
        return data.results && data.results.length > 0 ? data.results : null;
    } catch (error) {
        console.error(`Error fetching movie by title: ${title}`, error);
        return null;
    }
};

// Fungsi untuk mencari serial TV berdasarkan judul
export const getTvSeriesByTitle = async (title) => {
  try {
    const data = await fetchApi(`/search/tv?query=${encodeURIComponent(title)}`);
    return data.results && data.results.length > 0 ? data.results : null;
  } catch (error) {
    console.error(`Error fetching TV series by title: ${title}`, error);
    return null;
  }
};

// Fungsi untuk mendapatkan daftar genre film
export async function getMovieGenres() {
  try {
    const data = await fetchApi('/genre/movie/list');
    return data.genres;
  } catch (error) {
    console.error('Error fetching movie genres:', error);
    return [];
  }
}

// Fungsi untuk mendapatkan daftar genre serial TV
export async function getTvSeriesGenres() {
  try {
    const data = await fetchApi('/genre/tv/list');
    return data.genres;
  } catch (error) {
    console.error('Error fetching TV series genres:', error);
    return [];
  }
}

// Fungsi untuk mendapatkan film berdasarkan genre
export async function getMoviesByGenre(genreId, page = 1) {
  try {
    const data = await fetchApi(`/discover/movie?with_genres=${genreId}&page=${page}`);
    return data.results;
  } catch (error) {
    console.error(`Error fetching movies by genre ID ${genreId}:`, error);
    return [];
  }
}

// Fungsi untuk mendapatkan serial TV berdasarkan genre
export async function getTvSeriesByGenre(genreId, page = 1) {
  try {
    const data = await fetchApi(`/discover/tv?with_genres=${genreId}&page=${page}`);
    return data.results;
  } catch (error) {
    console.error(`Error fetching TV series by genre ID ${genreId}:`, error);
    return [];
  }
}

// Fungsi untuk mendapatkan film trending harian
export async function getTrendingMoviesDaily(page = 1) {
  try {
    const data = await fetchApi(`/trending/movie/day?page=${page}`);
    return data.results;
  } catch (error) {
    console.error('Error fetching daily trending movies:', error);
    return [];
  }
}

// Fungsi untuk mendapatkan serial TV trending harian
export async function getTrendingTvSeriesDaily(page = 1) {
  try {
    const data = await fetchApi(`/trending/tv/day?page=${page}`);
    return data.results;
  } catch (error) {
    console.error('Error fetching daily trending TV series:', error);
    return [];
  }
}

// Fungsi untuk mendapatkan film berdasarkan keyword ID (erotic)
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

// Fungsi untuk mendapatkan film dari list ID (adult)
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

// Fungsi untuk membuat slug dari judul (keep existing for backward compatibility)
export const createSlug = (title) => {
  if (!title) return '';
  
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '') // Hapus karakter tidak valid
    .replace(/\s+/g, '-') // Ganti spasi dengan dash
    .replace(/-+/g, '-') // Gabungkan multiple dash
    .trim();
};

// ✅ Untuk kompatibilitas dengan kode existing
export const checkForDuplicateTitleYear = async (items) => {
  const duplicates = detectDuplicates(items);
  const duplicateMap = new Map();
  
  duplicates.forEach(key => {
    duplicateMap.set(key, []);
  });
  
  return duplicateMap;
};