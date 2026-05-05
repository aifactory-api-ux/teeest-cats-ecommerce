import { useState, useCallback } from 'react';
import { Review, CreateReviewDto } from '../types/review';
import { reviewsApi } from '../api/reviews';

interface UseReviewReturn {
  reviews: Review[];
  loading: boolean;
  error: string | null;
  fetchReviews: (productId: string) => Promise<void>;
  addReview: (productId: string, data: CreateReviewDto) => Promise<void>;
}

export function useReview(): UseReviewReturn {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = useCallback(async (productId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await reviewsApi.getReviews(productId);
      setReviews(response.reviews);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch reviews';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const addReview = useCallback(async (productId: string, data: CreateReviewDto) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token') || '';
      const review = await reviewsApi.addReview(productId, data, token);
      setReviews(prev => [review, ...prev]);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to add review';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    reviews,
    loading,
    error,
    fetchReviews,
    addReview,
  };
}