import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails, getSimilarMovies } from '../services/Api';

function Movie() {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const data = await getMovieDetails(id);
        setMovieDetails(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  useEffect(() => {
    const fetchSimilarMoviesData = async () => {
      try {
        const movies = await getSimilarMovies(id);
        setSimilarMovies(movies);
      } catch (error) {
        console.error('Error fetching similar movies:', error);
      }
    };

    fetchSimilarMoviesData();
  }, [id]);

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <img
        className="shadow-lg w-full h-96 object-cover md:w-fit"
        src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
        alt={movieDetails.title}
      />
      <h2 className='ml-5 mt-2 text-4xl'>{movieDetails.title}</h2>
      <div className='ml-5 flex'>
        <p className='mr-8 '><i className="fa-regular fa-clock"></i> {movieDetails.runtime} minutes</p>
        <p><i className="fa-solid fa-star"></i> {movieDetails.vote_average}</p>
      </div>
      <div className='mb-8 mt-8 ml-5 flex justify-around'>
        <div>
          <h2 className='mr-8 text-2xl'>Release date</h2>
          <p>{movieDetails.release_date}</p>
        </div>
        <div>
          <h2 className='text-2xl'>Genre</h2>
          <p>{movieDetails.genres.map(genre => genre.name).join(' ')}</p>
        </div>
      </div>
      <div className='ml-5'>
        <h2 className='text-2xl'>Synopsis</h2>
        <p>{movieDetails.overview}</p>
      </div>

      <div className="mt-8 ml-5">
        <h2 className="text-2xl mb-4">Similar Movies</h2>
        <div className="flex snap-x overflow-x-auto space-x-4">
          {similarMovies.map(movie => (
            <div key={movie.id} className="h-auto mb-36 flex-shrink-0 rounded-lg shadow-lg overflow-hidden snap-center">
              <img
                className="w-52 rounded-3xl shadow-lg object-cover"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <p className="mt-2 w-48">{movie.title}  ({movie.release_date.split('-')[0]})</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Movie;
