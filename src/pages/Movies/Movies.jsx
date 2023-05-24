import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import css from './Movies.module.css';

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'e15851bc8e92542ba910284fa71ae7c4';

const Movies = () => {
  const [query, setQuery] = useState('');

  const searchMovies = async query => {
    try {
      const response = await axios.get(
        `${BASE_URL}search/movie?api_key=${API_KEY}&query=${query}`
      );
      const movies = response.data.results;
      // Обработка полученных фильмов
      console.log(movies);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    searchMovies(query);
  };

  const handleChange = event => {
    setQuery(event.target.value);
  };

  return (
    <form className={css.movieForm} onSubmit={handleSubmit}>
      <input
        className={css.movieInput}
        type="text"
        name="serchQuery"
        autoComplete="off"
        autoFocus
        placeholder="Search movies..."
        value={query}
        onChange={handleChange}
      />
      <button className={css.movieBtn} type="submit"></button>
    </form>
  );
};

export default Movies;
