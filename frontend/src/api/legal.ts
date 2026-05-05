import axios from 'axios';
import { LegalPage } from '../types/legal';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8006';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const legalApi = {
  getLegalPage: async (slug: string): Promise<LegalPage> => {
    const response = await api.get<LegalPage>(`/api/legal/${slug}`);
    return response.data;
  },
};

export default legalApi;