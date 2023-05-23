import React, { Suspense, useEffect, useState } from 'react';
import { fetchMoviesById } from 'api/fetchMovies';
import { useParams, Outlet } from 'react-router-dom';

const MovieDetails = () => {
  console.log(useParams());
  const [movie, setMovie] = useState(null);
  const { params } = useParams();
  // fetchMoviesById();
  console.log(useParams());

  console.log(movie);

  useEffect(() => {
    fetchMoviesById(params).then(res => {
      setMovie(res.results);
    });
  }, [params]);

  return <div>MOVIE!!!!!!!!!!!!!!</div>;
};

export default MovieDetails;
