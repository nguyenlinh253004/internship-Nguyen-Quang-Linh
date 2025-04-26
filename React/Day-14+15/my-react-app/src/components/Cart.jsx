import { useEffect } from 'react'
import CartItem from './CartItem'
import { getCart, saveCart } from '../utils/storage';
import { XCircleIcon } from '@heroicons/react/24/outline'

export default function Cart({ cartItems, setCartItems }) {
  useEffect(() => {
    const loadedCart = getCart()
    setCartItems(loadedCart)
  }, [setCartItems])

  const updateQuantity = (productId, newQuantity) => {
    const updatedCart = cartItems.map(item => 
      item.id === productId ? { ...item, quantity: newQuantity } : item
    ).filter(item => item.quantity > 0)
    
    setCartItems(updatedCart)
    saveCart(updatedCart)
  }

  const removeItem = (productId) => {
    updateQuantity(productId, 0)
  }

  const clearCart = () => {
    setCartItems([])
    saveCart([])
  }

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="flex w-full md:w-[1000px] bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col space-y-5 justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Giỏ hàng</h2>
          {cartItems.length > 0 && (
            <button 
              onClick={clearCart}
              className="text-sm text-red-500 hover:text-red-700 flex items-center"
            >
              <XCircleIcon className="w-5 h-5 mr-1" />
              Xóa tất cả
            </button>
          )}
        </div>
      </div>

      <div className="p-6 max-h-[500px] overflow-y-auto">
        {cartItems.length === 0 ? (
          <div className="text-center py-8">
            <div className="mx-auto h-24 w-24 text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-700">Giỏ hàng trống</h3>
            <p className="mt-1 text-gray-500">Hãy thêm sản phẩm vào giỏ hàng của bạn</p>
          </div>
        ) : (
          <div className="space-y-4">
            {cartItems.map(item => (
              <CartItem 
                key={item.id} 
                item={item} 
                onUpdateQuantity={updateQuantity} 
                onRemove={removeItem} 
              />
            ))}
          </div>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Tổng sản phẩm:</span>
            <span className="font-medium">{itemCount}</span>
          </div>
          <div className="flex justify-between text-lg font-bold text-gray-800 mb-4">
            <span>Tổng tiền:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 shadow-sm"
          >
            Thanh toán
          </button>
        </div>
      )}
    </div>
  )
}