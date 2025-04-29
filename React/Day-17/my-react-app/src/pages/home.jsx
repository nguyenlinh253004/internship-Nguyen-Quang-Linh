import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import axios from 'axios'
export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading,setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzQ1ODkyNjc4LCJleHAiOjE3NDU4OTYyNzh9.jMTwZdDWNRdqzzFWarprlDZQvHI7WByO4uA3WgQDgQM'
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/products', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProducts(res.data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products');
      } finally {
        setLoading(false);  // để chắc chắn loading = false dù thành công hay lỗi
      }
    };
  
    fetchProducts();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Products</h1>
      {loading?(<p>Dữ liệu đang tải</p>) : error?(<p>{error}</p>):( <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>)
      
     
    }
    </div>
  );
}