import { useState, useCallback } from 'react';
import { User, CreateUserDto, LoginDto } from '../types/user';
import { authApi } from '../api/auth';

interface UseAuthReturn {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (data: CreateUserDto) => Promise<void>;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authApi.login({ email, password });
      setToken(response.accessToken);
      setUser(response.user);
      localStorage.setItem('token', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  }, []);

  const register = useCallback(async (data: CreateUserDto) => {
    setLoading(true);
    setError(null);
    try {
      await authApi.register(data);
      await login(data.email, data.password);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Registration failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [login]);

  return {
    user,
    loading,
    error,
    login,
    logout,
    register,
  };
}