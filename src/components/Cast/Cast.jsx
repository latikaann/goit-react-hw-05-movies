import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import css from './Cast.module.css';

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'e15851bc8e92542ba910284fa71ae7c4';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const DEFAULT_POSTER_URL =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJnNH6I8IvZndxspJlJ0BDEyUNHxLvNokyWQ&usqp=CAU';
const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}movie/${movieId}/credits?api_key=${API_KEY}`
        );
        setCast(response.data.cast);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovie();
  }, [movieId]);

  console.log(cast);
  return (
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
  );
};

export default Cast;

// https://api.themoviedb.org/3/movie/603692/credits?api_key=e15851bc8e92542ba910284fa71ae7c4
