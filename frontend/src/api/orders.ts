import axios from 'axios';
import { Order, CreateOrderDto, OrderListResponse } from '../types/order';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const ordersApi = {
  createOrder: async (data: CreateOrderDto, token: string): Promise<Order> => {
    const response = await api.post<Order>('/api/orders', data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  getOrders: async (token: string): Promise<OrderListResponse> => {
    const response = await api.get<OrderListResponse>('/api/orders', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  getOrder: async (id: string, token: string): Promise<Order> => {
    const response = await api.get<Order>(`/api/orders/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
};

export default ordersApi;