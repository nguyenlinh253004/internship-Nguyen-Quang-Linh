import React, { createContext, useReducer, useContext } from 'react';

const CartContext = createContext();

const initialState = [];
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      const found = state.find(p => p.id === action.payload.id);
      if (found) {
        return state.map(p =>
          p.id === action.payload.id
            ? { ...p, quantity: p.quantity + action.payload.quantity }
            : p
        );
      }
      return [...state, action.payload];
    case 'REMOVE':
      return state.filter(p => p.id !== action.payload);
    case 'UPDATE':
      return state.map(p =>
        p.id === action.payload.id
          ? { ...p, quantity: action.payload.quantity }
          : p
      );
    case 'CLEAR':
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, initialState);
  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);