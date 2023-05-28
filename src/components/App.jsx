import { Route, Routes } from 'react-router-dom';
import SharedLayout from './SharedLayout/SharedLayout';
import Home from '../pages/Home/Home';
import Movies from '../pages/Movies/Movies';
// import MovieDetails from '../pages/MovieDetails/MovieDetails';
import css from './App.module.css';
import { lazy } from 'react';

const PageNotFound = lazy(() => import('../pages/PageNotFound/PageNotFound'));
const Reviews = lazy(() => import('./Reviews/Reviews'));
const Cast = lazy(() => import('./Cast/Cast'));
const MovieDetails = lazy(() => import('../pages/MovieDetails/MovieDetails'));

const App = () => {
  return (
    <div className={css.container}>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="movies" element={<Movies />} />
          <Route path="movies/:movieId" element={<MovieDetails />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
