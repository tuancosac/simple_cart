import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const authApi = {
  register: (data: { email: string; password: string; fullName?: string }) => 
    api.post('/auth/register', data),

  login: (data: { email: string; password: string }) => 
    api.post('/auth/login', data),
};