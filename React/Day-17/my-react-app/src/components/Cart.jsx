import React from 'react';
import useCartActions from '../hooks/useCartActions';

export default function CartPage() {
  const { cart, remove, update, total } = useCartActions();
  return (
    <div>
      <h2 className="text-2xl mb-4">Cart</h2>
      {cart.length === 0 ? <p>Empty</p> : (
        <ul>
          {cart.map(item => (
            <li key={item.id} className="mb-2">
              {item.name} x {item.quantity} = {item.price * item.quantity}₫
              <button onClick={() => update(item.id, item.quantity - 1)} className='bg-red-500 p-2 mr-4'>-</button>
              <button onClick={() => update(item.id, item.quantity + 1)} className='bg-green-500 p-2 mr-4'>+</button>
              <button onClick={() => remove(item.id)} className='text-red-600'>Del</button>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-4 font-bold">Total: {total}₫</p>
    </div>
  );
}
