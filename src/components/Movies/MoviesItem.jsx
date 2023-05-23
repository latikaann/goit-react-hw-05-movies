import React from 'react';
import css from './Movies.module.css';
import { Link } from 'react-router-dom';

const DEFAULT_POSTER_URL =
  'https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie.jpg';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const MoviesItem = ({ movies }) => {
  //   console.log('MOVIES', movies);
  return (
    <div>
      <ul className={css.moviesList}>
        {movies.map(movie => (
          <li key={movie.id} className={css.moviesItem}>
            <Link to={`${movie.id}`}>
              <p>{movie.title}</p>
              {/* <img
                className={css.movieImg}
                src={
                  movie.poster_path
                    ? IMG_URL + movie.poster_path
                    : DEFAULT_POSTER_URL
                }
                alt={movie.title}
              /> */}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoviesItem;
