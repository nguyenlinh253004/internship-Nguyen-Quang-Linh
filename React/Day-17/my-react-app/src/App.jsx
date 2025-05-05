import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import CartPage from './components/Cart';
import AdminProductList from './components/AdminProductList';
export default function App() {
  return (
    <div className="container mx-auto p-4">
      <nav className="flex gap-4 mb-4">
        <Link to="/products" className="text-blue-600">Products</Link>
        <Link to="/admin" className="text-blue-600">Admin</Link>
        <Link to="/cart" className="text-blue-600">Cart</Link>
      </nav>
      <Routes>
        <Route path="/products" element={<ProductList />} />
        <Route path="/admin" element={<ProductForm />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/admin/products" element={<AdminProductList />} />
        <Route path="*" element={<ProductList />} />
      </Routes>
    </div>
  );
}
