import { fetchMovieReviews } from '../../api/API';
import React, { Suspense, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import css from './Reviews.module.css';

const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchMovieReviews(movieId).then(res => {
      setReviews(res.results);
    });
  }, [movieId]);

  return (
    <Suspense>
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
                <p className={css.reviewsContent}>
                  Character: {review.content}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Suspense>
  );
};

export default Reviews;
