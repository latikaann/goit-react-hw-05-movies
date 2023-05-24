import React from 'react';
import css from './Movies.module.css';
import { Link } from 'react-router-dom';

const DEFAULT_POSTER_URL =
  'https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie.jpg';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const MoviesItem = ({ movies }) => {
  //   console.log('MOVIES', movies);
  return (
    <div className={css.movieContainer}>
      <ul className={css.moviesList}>
        {movies.map(movie => (
          <li key={movie.id} className={css.moviesItem}>
            <Link to={`/movies/${movie.id}`}>
              <img
                className={css.movieImg}
                src={
                  movie.poster_path
                    ? IMG_URL + movie.poster_path
                    : DEFAULT_POSTER_URL
                }
                alt={movie.title}
              />
              <p className={css.movieText}>{movie.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoviesItem;
