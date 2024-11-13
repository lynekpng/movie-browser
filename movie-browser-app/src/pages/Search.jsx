import React, { useState, useEffect } from 'react';
import { fetchGenres, getTrendingMovies, fetchMoviesByGenres, searchMoviesByName } from '../services/Api';
import { Link } from 'react-router-dom';

function Search() {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const genresData = await fetchGenres();
        setGenres(genresData);

        const trendingMoviesData = await getTrendingMovies();
        setMovieList(trendingMoviesData);
      } catch (error) {
        console.error('Error setting initial data:', error);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      if (selectedGenres.length === 0) {
        const trendingMoviesData = await getTrendingMovies();
        setMovieList(trendingMoviesData);
      } else {
        const moviesByGenresData = await fetchMoviesByGenres(selectedGenres);
        setMovieList(moviesByGenresData);
      }
    };

    fetchMovies();
  }, [selectedGenres]);

  const handleGenreChange = (event) => {
    const genreId = event.target.value;
    if (event.target.checked) {
      setSelectedGenres([...selectedGenres, genreId]);
    } else {
      setSelectedGenres(selectedGenres.filter((id) => id !== genreId));
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    try {
      const searchResults = await searchMoviesByName(searchQuery);
      setMovieList(searchResults);
    } catch (error) {
      console.error('Error searching movies:', error);
    }
  };

  return (
    <div>
      <div className='flex items-center justify-center'>
        <form onSubmit={handleSearchSubmit}>
          <input
            className="rounded-full py-1 px-4 bg-gray-700 bg-opacity-50 w-80"
            type="text"
            placeholder='Sherlock Holmes'
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
        </form>
      </div>
      <div>
        <div className='flex overflow-x-auto'>
          {genres.map((genre) => (
            <div key={genre.id}>
              <label className='text-xl m-4 cursor-pointer'>
                <input
                  className='hidden'
                  type="checkbox"
                  value={genre.id}
                  onChange={handleGenreChange}
                />
                {genre.name}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className='flex flex-wrap justify-around'>
          {movieList.map((movie) => (
            <div className='w-36' key={movie.id}>
              <Link to={`/movie/${movie.id}`}>
              <img
                className="rounded-lg shadow-lg"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <h3>{movie.title} ({movie.release_date.split('-')[0]})</h3>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Search;
