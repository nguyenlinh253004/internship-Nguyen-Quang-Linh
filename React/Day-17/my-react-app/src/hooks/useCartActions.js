import { useCart } from '../context/CartContext';
export default function useCartActions() {
  const { cart, dispatch } = useCart();
  const add = (item) => dispatch({ type: 'ADD', payload: item });
  const remove = (id) => dispatch({ type: 'REMOVE', payload: id });
  const update = (id, qty) => dispatch({ type: 'UPDATE', payload: { id, quantity: qty } });
  const clear = () => dispatch({ type: 'CLEAR' });
  const total = cart.reduce((sum, p) => sum + p.price * p.quantity, 0);
  return { cart, add, remove, update, clear, total };
}