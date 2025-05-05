import React from 'react'
import { useCart } from '../context/CartContext'
import { Link ,useNavigate} from 'react-router-dom'

const ProductCard = ({product}) => {
    const { addToCart } = useCart();
    const navigate= useNavigate();
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
     
       <Link to={`/product/${product.id}`}>
       <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
          <p className="text-gray-600 mb-2">${product.price}</p>
        </div>
       </Link>
       <div className="px-4 pb-4">
        <button 
          onClick={() => {addToCart(product);navigate('/cart')}}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default ProductCard