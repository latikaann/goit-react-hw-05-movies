import axios from 'axios';
import React, { Suspense, useEffect, useState } from 'react';
import { fetchMoviesById } from 'api/fetchMovies';
import { Link, useParams } from 'react-router-dom';
import css from './MovieDetails.module.css';

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'e15851bc8e92542ba910284fa71ae7c4';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const DEFAULT_POSTER_URL =
  'https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie.jpg';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}movie/${movieId}?api_key=${API_KEY}`
        );
        setMovie(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovie();
  }, [movieId]);

  if (!movie) {
    return <div>Loading...</div>;
  }
  const genreNames = movie.genres.map(genre => genre.name);
  // console.log(genreNames);
  console.log(movie);
  return (
    <div>
      <div className={css.movieTextBox}>
        <img
          className={css.movieImage}
          src={
            movie.poster_path ? IMG_URL + movie.poster_path : DEFAULT_POSTER_URL
          }
          alt={movie.title}
        />
        <div className={css.movieText}>
          <h1 className={css.movieTitle}>{movie.title}</h1>
          <ul className={css.movieRate}>
            <li>
              <p>
                <span className={css.textRateTitle}>Vote/Votes:</span>{' '}
                {movie.vote_average} / {movie.vote_count}
              </p>
            </li>
            <li>
              <p>
                <span className={css.textRateTitle}>Popularity:</span>{' '}
                {movie.popularity}
              </p>
            </li>
          </ul>

          <h2>Overview</h2>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          <ul className={css.genresList}>
            {genreNames.map(name => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <p>Additional information</p>
        <Link to={'Cast'}>Cast</Link>
        <Link to={'Reviews'}>Reviews</Link>
      </div>
    </div>
  );
};

export default MovieDetails;
