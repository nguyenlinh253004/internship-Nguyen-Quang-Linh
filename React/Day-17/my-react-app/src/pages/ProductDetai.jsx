import React from 'react'
import { useState,useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { useParams ,useNavigate} from 'react-router-dom'
import axios from 'axios'
const ProductDetail = () => {
    const [product, setProduct] = useState(null);
    const {id} = useParams();
    const {addToCart } = useCart();
    const navigate = useNavigate();
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzQ1ODkyNjc4LCJleHAiOjE3NDU4OTYyNzh9.jMTwZdDWNRdqzzFWarprlDZQvHI7WByO4uA3WgQDgQM'
    useEffect(()=>{
       const fetchProducts = async ()=>{
        try {
          const res = await axios.get('http://localhost:3000/api/products',{
            headers:{ Authorization: `Bearer ${token}`}
          })
          const foundProduct = res.data.data.find(item=>item.id === parseInt(id));
          if(foundProduct){

            setProduct(foundProduct);
          }
          else{
            console.log("không tìm thấy sản phẩm ")
          }
        } catch (error) {
          console.log(error)
        }
       }
       fetchProducts();
    },[id]);
    if (!product) {
        return <div className="text-center py-8">Loading...</div>;
      }
  return (
    <div className="max-w-4xl mx-auto">
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="md:flex">
        <div className="md:w-1/2">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6 md:w-1/2">
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-600 text-xl mb-4">${product.price}</p>
          <p className="text-gray-700 mb-6">{product.description}</p>
          <button 
            onClick={() => {addToCart(product);navigate('/cart')}}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
  )
}
export default ProductDetail