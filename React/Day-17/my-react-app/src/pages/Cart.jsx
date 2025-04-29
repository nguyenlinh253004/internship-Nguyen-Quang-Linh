import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { cart, removeFromCart } = useCart();
  
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      
      {cart.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">Your cart is empty</p>
          <Link 
            to="/" 
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
            <ul className="divide-y divide-gray-200">
              {cart.map(item => (
                <li key={item.id} className="p-4 flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-gray-600">${item.price} x {item.quantity}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex justify-between items-center bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</h2>
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}