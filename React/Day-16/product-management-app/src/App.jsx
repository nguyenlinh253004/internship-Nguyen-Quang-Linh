// import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import  CartProvider  from './context/CartContext'
import Home from './pages/Home'
import ProductDetails from './pages/ProductDetail'
import Cart from './pages/Cart'
import Navbar from './components/Navbar'
function App() {
 

  return (
    <>
     <CartProvider>
      <div className='container mx-auto px-4'>
        <h1 className='text-2xl font-bold text-center my-4'>Product Management App</h1>
        <Navbar />
        {/* Define your routes here */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      </div>
     </CartProvider>
    </>
  )
}

export default App
