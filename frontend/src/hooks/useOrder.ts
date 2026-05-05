import { useState, useCallback } from 'react';
import { Order, CreateOrderDto } from '../types/order';
import { ordersApi } from '../api/orders';

interface UseOrderReturn {
  orders: Order[];
  loading: boolean;
  error: string | null;
  createOrder: (data: CreateOrderDto) => Promise<Order>;
  fetchOrders: () => Promise<void>;
}

export function useOrder(): UseOrderReturn {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getToken = () => localStorage.getItem('token') || '';

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = getToken();
      const response = await ordersApi.getOrders(token);
      setOrders(response.orders);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch orders';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createOrder = useCallback(async (data: CreateOrderDto): Promise<Order> => {
    setLoading(true);
    setError(null);
    try {
      const token = getToken();
      const order = await ordersApi.createOrder(data, token);
      setOrders(prev => [order, ...prev]);
      return order;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create order';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    orders,
    loading,
    error,
    createOrder,
    fetchOrders,
  };
}