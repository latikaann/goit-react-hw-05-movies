import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import css from './Home.module.css';
import { fetchTrendingMovies } from 'api/fetchMovies';
import MoviesItem from 'pages/Movies/MoviesItem';

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchTrendingMovies().then(res => {
      setMovies(res.results);
    });
  }, []);

  return (
    <div>
      <h1 className={css.homeTitle}>Trending today</h1>
      <MoviesItem movies={movies} />
    </div>
  );
};

export default Home;
