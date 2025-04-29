import React from 'react'
import {Link} from 'react-router-dom';
import {useCart} from '../context/CartContext' 
const ProductCard = ({product}) => {
    const {addToCart} = useCart();
  return (
    <div>
       <Link to={`/product/${product.id}`}>
         <img src={product.image} alt={product.name}  className="w-full h-48 object-cover"/>
        <div className='p-4'>
        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-2">${product.price}</p>
        </div> 
       </Link >
       <div className="px-4 pb-4">
        <button 
          onClick={() => addToCart(product)}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Add to Cart
        </button>
       </div>

    </div>
  )
}

export default ProductCard