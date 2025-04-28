import React from 'react'
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'

const Navbar = () => {
    const { cart } = useCart();
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-lg font-bold">Product Management App</div>
      <div className="flex justify-between ">
       <div className='space-x-4 mx-4">'>
        <Link to="/" className="hover:text-gray-400 font-bold">Home</Link>
        <Link to="/cart" className="hover:text-gray-400  font-bold">Cart
         {cart.length > 0 && <span className="bg-red-500 text-white rounded-full px-2">{cart.reduce((total,item)=>total+item.quantity,0)}</span>}
         </Link> 
       </div>
      </div>
    </nav>
  )
}

export default Navbar