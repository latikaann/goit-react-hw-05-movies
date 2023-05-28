import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'e15851bc8e92542ba910284fa71ae7c4';

export const fetchTrendingMovies = async () => {
  const response = await axios.get(
    `${BASE_URL}trending/movie/day?api_key=${API_KEY}`
  );

  return response.data;
};

export const fetchMoviesById = async id => {
  const response = await axios.get(`${BASE_URL}movie/${id}?api_key=${API_KEY}`);
  // console.log('FILM ID', response.data);
  return response.data;
};

export const searchMovies = async (query, page = 1) => {
  const response = await axios.get(
    `${BASE_URL}search/movie?api_key=${API_KEY}&query=${query}&page=${page}`
  );

  return response.data;
};

export const fetchMovieReviews = async movieId => {
  const response = await axios.get(
    `${BASE_URL}movie/${movieId}/reviews?api_key=${API_KEY}`
  );
  return response.data;
};

export const fetchMovieCast = async movieId => {
  const response = await axios.get(
    `${BASE_URL}movie/${movieId}/credits?api_key=${API_KEY}`
  );
  return response.data;
};
