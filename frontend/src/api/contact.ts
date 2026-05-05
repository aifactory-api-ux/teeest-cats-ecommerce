import axios from 'axios';
import { ContactMessage, CreateContactDto } from '../types/contact';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const contactApi = {
  submitContact: async (data: CreateContactDto): Promise<ContactMessage> => {
    const response = await api.post<ContactMessage>('/api/contact', data);
    return response.data;
  },
};

export default contactApi;