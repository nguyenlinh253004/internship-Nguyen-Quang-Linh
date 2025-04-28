import React from 'react'
import { createContext,useContext } from 'react'
import { useState } from 'react'
const CartContext = createContext()
const CartProvider  = ({children}) => {
    const [cart, setCart] = useState([])
    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id)
            if(existingItem ){
                return prevCart.map((item)=>item.id === product.id ? {...item, quantity: item.quantity + 1} : item);
            }
            return [...prevCart, {...product, quantity: 1}]

        })
    }
    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId))
    }

  return (
  
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  )
}
export const useCart = () => {
    return useContext(CartContext)
}
export default CartProvider