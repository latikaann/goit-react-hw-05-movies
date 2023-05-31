import React, { Suspense, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './Movies.module.css';
import MoviesItem from './MoviesItem';
import Button from 'components/Button/Button';
import { searchMovies } from '../../api/API';
import { useSearchParams } from 'react-router-dom';

const Movies = () => {
  // const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  // const [searchQuery, setSearchQuery] = useState();
  const [page, setPage] = useState(1);
  const [totalMovies, setTotalMovies] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const query = searchParams.get('query');
    if (!query) {
      return;
    }
    searchMovies(query, page).then(res => {
      if (res.length === 0) {
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
        return;
      }
      setMovies(prevMovies => [...prevMovies, ...res.results]);
      setTotalMovies(res.total_results);
    });
  }, [searchParams, page]);

  const handleSubmit = event => {
    event.preventDefault();
    setPage(1);
    setMovies([]);
    setSearchParams({ query: event.target.searchQuery.value });
  };

  const onLoadMore = () => {
    if (totalMovies === movies.length) {
      toast.info("We're sorry, but you've reached the end of search results.", {
        position: 'bottom-center',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      return;
    }

    setPage(prevPage => prevPage + 1);
  };

  const hideBtn = movies.length === totalMovies;

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
            // value={query}
            // onChange={handleChange}
          />
          <button className={css.movieBtn} type="submit"></button>
        </form>
        <MoviesItem movies={movies} />
        {movies.length > 0 && !hideBtn && (
          <Button onClick={onLoadMore} className={'movieBtn'}>
            Load more
          </Button>
        )}
        <ToastContainer />
      </div>
    </Suspense>
  );
};

export default Movies;
