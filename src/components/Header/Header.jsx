import React from 'react';
import { NavLink } from 'react-router-dom';
import css from './Header.module.css';

const Header = () => {
  return (
    <div className={css.header}>
      {/* <nav className={css.navLinks}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/Movies">Movies</NavLink>
      </nav> */}
    </div>
  );
};

export default Header;
