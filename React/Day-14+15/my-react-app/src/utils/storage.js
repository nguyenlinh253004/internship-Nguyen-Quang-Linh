const PRODUCTS_KEY = 'products'
const CART_KEY = 'cart'

export const getProducts = () => {
  const products = localStorage.getItem(PRODUCTS_KEY)
  return products ? JSON.parse(products) : []
}

export const saveProducts = (products) => {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products))
}

export const getCart = () => {
  const cart = localStorage.getItem(CART_KEY)
  return cart ? JSON.parse(cart) : []
}

export const saveCart = (cart) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart))
}