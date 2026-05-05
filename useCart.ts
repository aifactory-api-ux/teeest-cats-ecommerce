import { useState, useCallback } from 'react';
import { Cart, AddToCartDto } from '../types/cart';
import { cartApi } from '../api/cart';

interface UseCartReturn {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
  addItem: (productId: string, quantity: number) => Promise<void>;
  updateItem: (productId: string, quantity: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  refetch: () => Promise<void>;
}

export function useCart(): UseCartReturn {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getToken = () => localStorage.getItem('token') || '';

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = getToken();
      if (token) {
        const data = await cartApi.getCart(token);
        setCart(data);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch cart';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const addItem = useCallback(async (productId: string, quantity: number) => {
    setLoading(true);
    setError(null);
    try {
      const token = getToken();
      const data: AddToCartDto = { productId, quantity };
      const updatedCart = await cartApi.addItem(data, token);
      setCart(updatedCart);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to add item';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateItem = useCallback(async (productId: string, quantity: number) => {
    setLoading(true);
    setError(null);
    try {
      const token = getToken();
      const updatedCart = await cartApi.updateItem(productId, { quantity }, token);
      setCart(updatedCart);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update item';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const removeItem = useCallback(async (productId: string) => {
    setLoading(true);
    setError(null);
    try {
      const token = getToken();
      const updatedCart = await cartApi.removeItem(productId, token);
      setCart(updatedCart);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to remove item';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearCart = useCallback(async () => {
    setCart(null);
  }, []);

  return {
    cart,
    loading,
    error,
    addItem,
    updateItem,
    removeItem,
    clearCart,
    refetch,
  };
}