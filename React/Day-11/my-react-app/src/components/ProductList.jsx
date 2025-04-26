// import { useState } from 'react';
import { useNavigate } from "react-router-dom";
const productsData = [
  { id: 1, name: 'Laptop', price: 999 },
  { id: 2, name: 'Smartphone', price: 499 },
  { id: 3, name: 'Headphones', price: 99 },
];

const ProductList = ({ addToCart }) => {
    const Navigate = useNavigate();
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-slate-400 to-orange-400">Danh sách sản phẩm </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {productsData.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600">${product.price}</p>
            <button
             onClick={() => {
                addToCart(product);
                Navigate("/Cart");
              }}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;