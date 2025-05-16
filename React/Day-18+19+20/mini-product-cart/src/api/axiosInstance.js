import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api',    // base URL chung cho tất cả các call
});

// Interceptor để tự động gắn Authorization header nếu đã có token
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);
``
export default axiosInstance;
