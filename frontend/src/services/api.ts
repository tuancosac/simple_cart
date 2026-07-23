import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000'; // Thay bằng URL NestJS của bạn

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

export const setAuthToken = (token: string) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const productApi = {
  getAll: () => api.get('/products'),
  create: (data: any) => api.post('/products', data),
  update: (id: string, data: any) => api.put(`/products/${id}`, data),
  delete: (id: string) => api.delete(`/products/${id}`),
};

export const cartApi = {
  getCart: () => api.get('/cart'),
  addToCart: (productId: string, quantity: number = 1) => 
    api.post('/cart/add', { productId, quantity }),
  updateQuantity: (productId: string, quantity: number) => 
    api.patch('/cart/update', { productId, quantity }),
  removeFromCart: (productId: string) => 
    api.delete(`/cart/${productId}`),
};