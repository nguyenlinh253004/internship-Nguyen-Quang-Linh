import React, { createContext, useReducer } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

export const CartContext = createContext();

const initialCart = {
  items: [],         // [{ id, name, price, image, quantity }]
  totalAmount: 0,    // tổng tiền
};

function cartReducer(state, action) {
  let updatedItems;
  switch (action.type) {
    case 'ADD_ITEM': {
      const item = action.payload;
      const exist = state.items.find(i => i.id === item.id);
      if (exist) {
        // tăng quantity
        updatedItems = state.items.map(i =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      } else {
        updatedItems = [...state.items, { ...item }];
      }
      break;
    }
    case 'REMOVE_ITEM': {
      updatedItems = state.items.filter(i => i.id !== action.payload);
      break;
    }
    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        updatedItems = state.items.filter(i => i.id !== id);
      } else {
        updatedItems = state.items.map(i =>
          i.id === id ? { ...i, quantity } : i
        );
      }
      break;
    }
    case 'CLEAR_CART': {
      updatedItems = [];
      break;
    }
    default:
      return state;
  }

  // tính tổngAmount
  const totalAmount = updatedItems.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );
  return { items: updatedItems, totalAmount };
}

export function CartProvider({ children }) {
  // Dùng useLocalStorage để load & sync cart state
  const [persistedCart, setPersistedCart] = useLocalStorage('cart', initialCart);

  const [state, dispatch] = useReducer(cartReducer, persistedCart);

  // Mỗi khi state thay đổi, cập nhật lại localStorage
  React.useEffect(() => {
    setPersistedCart(state);
  }, [state, setPersistedCart]);

  // Các action helpers
  const addItem    = item => dispatch({ type: 'ADD_ITEM', payload: item });
  const removeItem = id   => dispatch({ type: 'REMOVE_ITEM', payload: id });
  const updateQty  = (id, quantity) =>
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  const clearCart  = ()   => dispatch({ type: 'CLEAR_CART' });
  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
  return (
    <CartContext.Provider
      value={{
        items: state.items,
        totalAmount: state.totalAmount,
        addItem,
        removeItem,
        updateQty,
        clearCart,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
