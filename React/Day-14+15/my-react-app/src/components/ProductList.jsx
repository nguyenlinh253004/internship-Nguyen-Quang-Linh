import { useState, useEffect } from 'react'
import ProductItem from './ProductItem'
import ProductForm from './ProductForm'
import { getProducts, saveProducts } from '../utils/storage'

export default function ProductList({ addToCart }) {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const loadedProducts = getProducts()
    if (loadedProducts.length === 0) {
      const sampleProducts = [
        { id: 1, name: 'iPhone 13', price: 999, image: 'https://placehold.co/150x150?text=iPhone' },
        { id: 2, name: 'Samsung Galaxy S21', price: 799, image: 'https://placehold.co/150x150?text=iPhone' },
        { id: 3, name: 'Google Pixel 6', price: 599, image: 'https://placehold.co/150x150?text=iPhone' }
      ]
      saveProducts(sampleProducts)
      setProducts(sampleProducts)
    } else {
      setProducts(loadedProducts)
    }
  }, [])

  const handleAddNewProduct = (newProduct) => {
    const updatedProducts = [...products, newProduct]
    setProducts(updatedProducts)
    saveProducts(updatedProducts)
  }

  return (
    <div className="w-full md:w-2/3 p-4">
      <h2 className="text-2xl font-bold mb-6">Danh sách sản phẩm</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(product => (
          <ProductItem 
            key={product.id} 
            product={product} 
            onAddToCart={addToCart} 
          />
        ))}
      </div>
      <ProductForm onAddProduct={handleAddNewProduct} />
    </div>
  )
}