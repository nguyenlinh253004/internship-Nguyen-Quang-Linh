import { useState } from 'react'

export default function ProductForm({ onAddProduct }) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: ''
  })
  const [errors, setErrors] = useState({})

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Tên sản phẩm không được để trống'
    if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0) {
      newErrors.price = 'Giá sản phẩm phải là số dương'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      const newProduct = {
        id: Date.now(),
        name: formData.name,
        price: Number(formData.price),
        image: formData.image || 'https://placehold.co/150x150?text=iPhone'
      }
      onAddProduct(newProduct)
      setFormData({ name: '', price: '', image: '' })
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 p-6 border rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold mb-4">Thêm sản phẩm mới</h3>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Tên sản phẩm:</label>
        <input 
          type="text" 
          name="name" 
          value={formData.name} 
          onChange={handleChange}
          className={`w-full p-2 border rounded ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Giá:</label>
        <input 
          type="number" 
          name="price" 
          value={formData.price} 
          onChange={handleChange}
          className={`w-full p-2 border rounded ${errors.price ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Hình ảnh (URL):</label>
        <input 
          type="text" 
          name="image" 
          value={formData.image} 
          onChange={handleChange}
          placeholder="Để trống nếu sử dụng ảnh mặc định"
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <button 
        type="submit" 
        className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition-colors"
      >
        Thêm sản phẩm
      </button>
    </form>
  )
}