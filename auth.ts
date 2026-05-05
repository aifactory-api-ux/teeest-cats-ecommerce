import axios from 'axios';
import { User, CreateUserDto, LoginDto, AuthResponse } from '../types/user';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8001';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authApi = {
  register: async (data: CreateUserDto): Promise<User> => {
    const response = await api.post<User>('/api/auth/register', data);
    return response.data;
  },

  login: async (data: LoginDto): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/api/auth/login', data);
    return response.data;
  },

  getMe: async (token: string): Promise<User> => {
    const response = await api.get<User>('/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
};

export default authApi;