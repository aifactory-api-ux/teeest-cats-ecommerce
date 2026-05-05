import { useState, useCallback } from 'react';
import { Product, ProductQueryParams, ProductListResponse } from '../types/product';
import { productsApi } from '../api/products';

interface UseProductsReturn {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  loading: boolean;
  error: string | null;
  fetchProducts: (params?: ProductQueryParams) => Promise<void>;
}

export function useProducts(): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async (params?: ProductQueryParams) => {
    setLoading(true);
    setError(null);
    try {
      const response: ProductListResponse = await productsApi.getProducts(params);
      setProducts(response.products);
      setTotal(response.total);
      setPage(response.page);
      setLimit(response.limit);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch products';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    products,
    total,
    page,
    limit,
    loading,
    error,
    fetchProducts,
  };
}