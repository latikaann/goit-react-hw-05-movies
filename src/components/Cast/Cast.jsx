import React, { Suspense, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import css from './Cast.module.css';
import { fetchMovieCast } from '../../api/API';

const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const DEFAULT_POSTER_URL =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJnNH6I8IvZndxspJlJ0BDEyUNHxLvNokyWQ&usqp=CAU';
const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);

  useEffect(() => {
    fetchMovieCast(movieId).then(res => {
      setCast(res.cast);
    });
  }, [movieId]);

  return (
    <Suspense>
      <div>
        {cast && (
          <ul className={css.castList}>
            {cast.map(actor => (
              <li className={css.castItem} key={actor.id}>
                <img
                  className={css.castImg}
                  src={
                    actor.profile_path
                      ? IMG_URL + actor.profile_path
                      : DEFAULT_POSTER_URL
                  }
                  alt={actor.name}
                />
                <div className={css.castText}>
                  <p className={css.castTitle}>{actor.name}</p>
                  <p>Character: {actor.character}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Suspense>
  );
};

export default Cast;
