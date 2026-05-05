import { useState, useCallback } from 'react';
import { ContactMessage, CreateContactDto } from '../types/contact';
import { contactApi } from '../api/contact';

interface UseContactReturn {
  sendMessage: (data: CreateContactDto) => Promise<ContactMessage>;
  loading: boolean;
  error: string | null;
  success: boolean;
}

export function useContact(): UseContactReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const sendMessage = useCallback(async (data: CreateContactDto): Promise<ContactMessage> => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const message = await contactApi.submitContact(data);
      setSuccess(true);
      return message;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to send message';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    sendMessage,
    loading,
    error,
    success,
  };
}