import { useState, useEffect } from 'react';
import { LegalPage } from '../types/legal';
import { legalApi } from '../api/legal';

interface UseLegalReturn {
  page: LegalPage | null;
  loading: boolean;
  error: string | null;
  fetchLegalPage: (slug: string) => Promise<void>;
}

export function useLegal(): UseLegalReturn {
  const [page, setPage] = useState<LegalPage | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLegalPage = async (slug: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await legalApi.getLegalPage(slug);
      setPage(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch legal page';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    page,
    loading,
    error,
    fetchLegalPage,
  };
}