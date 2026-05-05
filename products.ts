import axios from 'axios';
import { Product, CreateProductDto, UpdateProductDto, ProductQueryParams, ProductListResponse } from '../types/product';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8002';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const productsApi = {
  getProducts: async (params?: ProductQueryParams): Promise<ProductListResponse> => {
    const response = await api.get<ProductListResponse>('/api/products', { params });
    return response.data;
  },

  getProduct: async (id: string): Promise<Product> => {
    const response = await api.get<Product>(`/api/products/${id}`);
    return response.data;
  },

  createProduct: async (data: CreateProductDto, token: string): Promise<Product> => {
    const response = await api.post<Product>('/api/products', data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  updateProduct: async (id: string, data: UpdateProductDto, token: string): Promise<Product> => {
    const response = await api.put<Product>(`/api/products/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  deleteProduct: async (id: string, token: string): Promise<{ success: boolean }> => {
    const response = await api.delete<{ success: boolean }>(`/api/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
};

export default productsApi;