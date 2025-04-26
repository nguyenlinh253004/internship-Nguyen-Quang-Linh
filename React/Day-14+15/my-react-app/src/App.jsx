import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Home from './Page/Home';
// import Navbar from './components/Navbar'; // You'll need to create this component
// import Footer from './components/Footer'; // You'll need to create this component

export default function App() {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      let updatedItems;
      
      if (existingItem) {
        updatedItems = prevItems.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        updatedItems = [...prevItems, { ...product, quantity: 1 }];
      }
      
      localStorage.setItem('cart', JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  // const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* Navigation Bar */}
        {/* <Navbar cartItemCount={cartItemCount} /> */}
        
        {/* Main Content */}
        <main className="flex-grow container mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
              Ứng dụng quản lý sản phẩm và giỏ hàng
            </h1>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route 
                  path="/products" 
                  element={<ProductList addToCart={addToCart} />} 
                />
                <Route 
                  path="/cart" 
                  element={
                    <Cart 
                      cartItems={cartItems} 
                      setCartItems={setCartItems} 
                    />
                  } 
                />
              </Routes>
            </div>
          </div>
        </main>

        {/* Footer */}
        {/* <Footer /> */}
      </div>
    </Router>
  );
}