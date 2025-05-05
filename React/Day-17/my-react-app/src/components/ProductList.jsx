import React, { useState, useEffect } from 'react';
import useCartActions from '../hooks/useCartActions';
import { getProducts } from '../api/products';
import { useNavigate } from 'react-router-dom';
export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { add } = useCartActions();
  const navigate = useNavigate(); // Thêm hook navigate
  useEffect(() => {
    setLoading(true);
    getProducts().then(res => setProducts(res.data.data || res.data))
                .catch(console.error)
                .finally(() => setLoading(false));
  }, []);
  const handleAddToCart = (product) => {
    add({ 
      id: product.id, 
      name: product.name, 
      price: product.price, 
      quantity: 1 
    });
    navigate('/cart'); // Chuyển hướng sau khi thêm vào giỏ
  };

  if (loading) return <p>Loading...</p>;
  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map(p => (
        <div key={p.id} className="border p-4 rounded">
          <h3 className="font-bold mb-2">{p.name}</h3>
          <p>{p.price}₫</p>
          <button
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
            onClick={() => handleAddToCart(p)}
          >Add
          </button>
        </div>
      ))}
    </div>
  );
}
