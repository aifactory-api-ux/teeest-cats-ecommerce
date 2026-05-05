import axios from 'axios';
import { Cart, AddToCartDto, UpdateCartItemDto } from '../types/cart';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const cartApi = {
  getCart: async (token: string): Promise<Cart> => {
    const response = await api.get<Cart>('/api/cart', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  addItem: async (data: AddToCartDto, token: string): Promise<Cart> => {
    const response = await api.post<Cart>('/api/cart/items', data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  updateItem: async (productId: string, data: UpdateCartItemDto, token: string): Promise<Cart> => {
    const response = await api.put<Cart>(`/api/cart/items/${productId}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  removeItem: async (productId: string, token: string): Promise<Cart> => {
    const response = await api.delete<Cart>(`/api/cart/items/${productId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
};

export default cartApi;