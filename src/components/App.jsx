// import Header from './Header/Header';
import Home from './Home/Home';
import Movies from './Movies/Movies';
import MovieDetails from './MovieDetails/MovieDetails';
import Cast from './Cast/Cast';
import Reviews from './Reviews/Reviews';
import PageNotFound from './PageNotFound/PageNotFound';
import css from './App.module.css';
import { NavLink, Route, Routes } from 'react-router-dom';

const App = () => {
  // console.log(window.location);
  return (
    <div className={css.container}>
      <nav className={css.links}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/Movies">Movies</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:movieId" element={<MovieDetails />}>
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default App;
