import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
const Navbar = () => {
    const {totalItems} = useCart();
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Shop App</Link>
        <div className="flex items-center space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/cart" className="hover:underline flex items-center">
            Cart
            {totalItems > 0 && (
              <span className="ml-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar