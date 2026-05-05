import axios from 'axios';
import { Review, CreateReviewDto, ReviewListResponse } from '../types/review';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const reviewsApi = {
  getReviews: async (productId: string): Promise<ReviewListResponse> => {
    const response = await api.get<ReviewListResponse>(`/api/products/${productId}/reviews`);
    return response.data;
  },

  addReview: async (productId: string, data: CreateReviewDto, token: string): Promise<Review> => {
    const response = await api.post<Review>(`/api/products/${productId}/reviews`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
};

export default reviewsApi;