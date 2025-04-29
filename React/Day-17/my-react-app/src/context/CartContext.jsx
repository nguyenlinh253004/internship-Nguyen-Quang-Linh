import React from 'react'
import { useReducer,useContext,createContext } from 'react'

const CartContext = createContext();

const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

function cartReducer(state,action){
    switch(action.type){
        case ADD_TO_CART:
          const existingItem = state.find(item => item.id === action.payload.id);
            if(existingItem){
                return state.map(item=>
                    item.id===action.payload.id ? {...item,quantity: item.quantity + 1}:item
                );
            }
            return [...state,{...action.payload,quantity:1}]
        case REMOVE_FROM_CART:
            return state.filter(item => item.id !== action.payload);
        default:
            return state;
    }
}




const CartProvider = ({children}) => {
    const [cart,dispatch] = useReducer(cartReducer,[]);
  
    const addToCart = (product)=>{
   dispatch({type:ADD_TO_CART,payload:product})
    }
    const removeFromCart  = (productId)=>{
   dispatch({type:REMOVE_FROM_CART,payload:productId})
    }

    const totalItems =cart.reduce((total,item)=>total+item.quantity,0);
  return (
    <CartContext.Provider value={{cart,addToCart,removeFromCart,totalItems}}>
        {children}
    </CartContext.Provider>
  )
}
export const useCart = ()=>{
   const context = useContext(CartContext);
   if(!context){
    throw new Error('không tìm thấy context');
   }
   return context;
}
export default CartProvider