import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';

export default function useProducts({ initialSearch = '', initialPage = 1, limit = 5 }) {
  const [search, setSearch]     = useState(initialSearch);
  const [page, setPage]         = useState(initialPage);
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        setError(null);
        // Backend dùng skip = (page-1)*limit
        const skip = (page - 1) * limit;
        const res = await axiosInstance.get('/products', {
          params: { search, limit, skip }
        });
        // Giả sử API trả về { data: [...], total: 20 }
        setProducts(res.data.data || res.data);  
        setTotalCount(res.data.pagination.total);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [search, page, limit]);

  const totalPages = Math.ceil(totalCount / limit);
// Thêm hàm lấy ảnh từ localStorage (nếu cần)
const getStoredImages = () => {
  try {
    return JSON.parse(localStorage.getItem('productImages')) || {};
  } catch {
    return {};
  }
};

// Trong hook useProducts, thêm logic lấy ảnh nếu cần
const [storedImages] = useState(getStoredImages());
  return {
    products: products.map(p => ({
      ...p,
      // Thêm ảnh từ storage nếu có
      image: storedImages[p.id] || p.image
    })),
    loading,
    error,
    search,
    setSearch,
    page,
    setPage,
    totalPages,
  };
}
