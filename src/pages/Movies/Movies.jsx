import React, { Suspense, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './Movies.module.css';
import MoviesItem from './MoviesItem';
import Button from 'components/Button/Button';
import { searchMovies } from '../../api/API';

const Movies = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState();
  const [page, setPage] = useState(1);
  const [totalMovies, setTotalMovies] = useState(0);

  useEffect(() => {
    if (searchQuery) {
      searchMovies(searchQuery).then(res => {
        setMovies(res.results);
      });
    }
  }, [searchQuery]);

  const handleSubmit = async event => {
    event.preventDefault();

    if (query === '') {
      toast.info('Please, fill in the field', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      return;
    }

    const response = await searchMovies(query);
    const movies = response.results;
    const totalMovies = response.total_pages;

    if (movies.length === 0) {
      toast.error('No movies found. Please try a different search query.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }

    setMovies(movies);
    setPage(1);
    setSearchQuery(query);
    setTotalMovies(totalMovies);
    setQuery('');
  };

  const handleChange = event => {
    setQuery(event.target.value.trim());
  };

  const onLoadMore = async e => {
    try {
      const response = await searchMovies(searchQuery, page + 1);
      const newMovies = response.results;
      setMovies(prevMovies => [...prevMovies, ...newMovies]);
      setPage(prevPage => prevPage + 1);

      if (totalMovies - 1 === page) {
        toast.info(
          "We're sorry, but you've reached the end of search results.",
          {
            position: 'bottom-center',
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          }
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const hideBtn = page === totalMovies;

  // console.log(movies);
  return (
    <Suspense>
      <div className={css.moviesBox}>
        <form className={css.movieForm} onSubmit={handleSubmit}>
          <input
            className={css.movieInput}
            type="text"
            name="searchQuery"
            autoComplete="off"
            autoFocus
            placeholder="Search movies..."
            value={query}
            onChange={handleChange}
          />
          <button
            className={css.movieBtn}
            type="submit"
            onClick={handleSubmit}
          ></button>
        </form>
        <MoviesItem movies={movies} />
        {movies.length > 0 && !hideBtn && (
          <Button onClick={onLoadMore}>Load more</Button>
        )}
        <ToastContainer />
      </div>
    </Suspense>
  );
};

export default Movies;
