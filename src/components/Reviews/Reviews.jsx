import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import css from './Reviews.module.css';

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'e15851bc8e92542ba910284fa71ae7c4';

const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}movie/${movieId}/reviews?api_key=${API_KEY}`
        );

        setReviews(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovie();
  }, [movieId]);

  console.log(reviews);

  return (
    <div>
      {reviews.length === 0 ? (
        <p className={css.reviewsText}>
          We don't have any reviews for this movie.
        </p>
      ) : (
        <ul className={css.reviewsList}>
          {reviews.map(review => (
            <li className={css.reviewsItem} key={review.id}>
              <h3>Author: {review.author}</h3>
              <p className={css.reviewsContent}>Character: {review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Reviews;
