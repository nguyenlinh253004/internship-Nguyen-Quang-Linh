import axios from 'axios';
const api = axios.create({ baseURL: 'http://localhost:3000/api' });
export const getProducts = () => api.get('/products');
export const createProduct = (data) => api.post('/products/admin/products', data);
export const updateProduct = (id, data) => api.put(`/products/admin/products/${id}`, data);
export const deleteProduct = (id) => api.delete(`/products/admin/products/${id}`);
