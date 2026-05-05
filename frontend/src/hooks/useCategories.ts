import { useState, useEffect } from 'react';
import { Category } from '../types/category';
import { categoriesApi } from '../api/categories';

interface UseCategoriesReturn {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

export function useCategories(): UseCategoriesReturn {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await categoriesApi.getCategories();
        setCategories(response.categories);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to fetch categories';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    error,
  };
}