import axios from 'axios';
import { Category, CategoryListResponse } from '../types/category';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const categoriesApi = {
  getCategories: async (): Promise<CategoryListResponse> => {
    const response = await api.get<CategoryListResponse>('/api/categories');
    return response.data;
  },
};

export default categoriesApi;