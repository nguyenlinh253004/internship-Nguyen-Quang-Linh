import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProductListPage from './pages/ProductListPage';
import CartPage from './pages/CartPage';
import AdminProductPage from './pages/AdminProductPage';
// import Header from './components/Header';
import { useState } from 'react';
function App() {
  const [token,setToken] = useState(localStorage.getItem('token'));
  return (
    <div>

      {/* <Header /> */}
      <Routes>
        <Route path="/login" element={<LoginPage setToken={setToken}/>} />
        {/* Nếu chưa login thì redirect về /login */}
        <Route
          path="/products"
          element={token ? <ProductListPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/cart"
          element={token ? <CartPage /> : <Navigate to="/login" />}
        />
        {/* Route admin */}
        <Route
          path="/admin/products"
          element={token ? <AdminProductPage /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/products" />} />
      </Routes>
    </div>

    
  );
}

export default App;
