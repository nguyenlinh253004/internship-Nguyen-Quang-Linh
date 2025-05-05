import axiosInstance from './axiosInstance';

export const fetchProducts = ({ search = '', limit = 5, skip = 0 }) =>
  axiosInstance.get('/products', { params: { search, limit, skip } });

export const createProduct = (data) =>
  axiosInstance.post('/products/admin/products', data);

export const updateProduct = (id, data) =>
  axiosInstance.put(`/products/admin/products/${id}`, data);

export const deleteProduct = (id) =>
  axiosInstance.delete(`/products/admin/products/${id}`);
// Thêm hàm lưu ảnh vào localStorage
export const saveProductImage = (productId, imageUrl) => {
    try {
      const images = JSON.parse(localStorage.getItem('productImages')) || {};
      images[productId] = imageUrl;
      localStorage.setItem('productImages', JSON.stringify(images));
      return true;
    } catch (error) {
      console.error('Lỗi khi lưu ảnh:', error);
      return false;
    }
  };