import React from 'react';
import { NavLink } from 'react-router-dom';
import css from './Movies.module.css';

const Movies = () => {
  // useEffect(() => {
  //   //HTTP запрос
  // }, []);

  return (
    <div>
      <form>
        <input
          type="text"
          name="serchQuery"
          autoComplete="off"
          autoFocus
          placeholder="Search movies..."
        />

        <button type="submit">
          <span>Search</span>
        </button>
      </form>
    </div>
  );
};

export default Movies;
