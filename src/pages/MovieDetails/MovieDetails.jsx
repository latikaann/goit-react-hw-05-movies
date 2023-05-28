import React, { Suspense, useEffect, useState } from 'react';
import {
  Link,
  useParams,
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import css from './MovieDetails.module.css';
import Button from '../../components/Button/Button';
import { fetchMoviesById } from '../../api/API';

const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const DEFAULT_POSTER_URL =
  'https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie.jpg';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchMoviesById(movieId).then(res => {
      setMovie(res);
    });
  }, [movieId]);

  if (!movie) {
    return;
  }
  const genreNames = movie.genres.map(genre => genre.name);

  const handleBackClick = () => {
    navigate(location.state?.from || '/');
  };

  return (
    <div className={css.movieDetailsBox}>
      <Button onClick={handleBackClick}>Back</Button>
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
      <div className={css.movieAddInfo}>
        <Link state={location.state} to={'Cast'}>
          Cast
        </Link>
        <Link state={location.state} to={'Reviews'}>
          Reviews
        </Link>
      </div>

      <Suspense>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetails;
