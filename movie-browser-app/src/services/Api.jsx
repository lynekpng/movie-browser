const VITE_API_KEY = import.meta.env.VITE_API_KEY
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL

export const getTrendingMovies = async () => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/trending/movie/week?api_key=${VITE_API_KEY}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const json = await response.json();
    return json.results;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw error;
  }
};

export const fetchGenres = async () => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/genre/movie/list?api_key=${VITE_API_KEY}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const json = await response.json();
    return json.genres;
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  }
};

export const fetchMoviesByGenres = async (selectedGenres) => {
  try {
    const genreIds = selectedGenres.join(',');
    const response = await fetch(`${VITE_BASE_URL}/discover/movie?api_key=${VITE_API_KEY}&with_genres=${genreIds}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const json = await response.json();
    return json.results;
  } catch (error) {
    console.error('Error fetching movies by genres:', error);
    throw error;
  }
};

export const searchMoviesByName = async (query) => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/search/movie?api_key=${VITE_API_KEY}&query=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const json = await response.json();
    return json.results;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

export const getMovieDetails = async (movieId) => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/movie/${movieId}?api_key=${VITE_API_KEY}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

export const getSimilarMovies = async (movieId) => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/movie/${movieId}/similar?api_key=${VITE_API_KEY}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const json = await response.json();
    return json.results;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw error;
  }
};