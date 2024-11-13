import React, { useState, useEffect } from 'react';
import { getTrendingMovies } from '../services/Api';
import { Link } from 'react-router-dom';

function Home() {
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const movies = await getTrendingMovies();
        setMovieList(movies);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <div className="max-w-screen-lg mx-auto p-6 rounded-lg shadow-lg">
      <h2 className='text-3xl mb-4'>Trending</h2>
      <div className="flex overflow-x-auto space-x-4 snap-x custom-scrollbar">
        {movieList.map((movie) => (
          <div key={movie.id} className="flex-shrink-0 rounded-lg shadow-lg overflow-hidden snap-center relative">
            <Link to={`/movie/${movie.id}`}>
              <img
                className="w-64 aspect-auto object-cover rounded-3xl"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <div className="absolute top-0 right-0 m-2 bg-black bg-opacity-50 text-white p-2 rounded-lg">
                <p className="flex items-center">
                  <i className="fa-solid fa-star text-yellow-500 mr-2"></i> 
                  {movie.vote_average}
                </p>
              </div>
              <div className="absolute bottom-0 left-0 m-2 bg-black bg-opacity-50 text-white p-2 rounded-lg">
                <h3 className="text-lg font-bold">{movie.title}</h3>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
