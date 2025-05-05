import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { createProduct } from '../api/products';

// Complete validation schema
const schema = Yup.object({
  name: Yup.string().required('Product name is required'),
  price: Yup.number()
    .positive('Price must be positive')
    .required('Price is required')
    .typeError('Price must be a number'),
  stock: Yup.number()
    .integer('Stock must be an integer')
    .min(0, 'Stock cannot be negative')
    .required('Stock is required')
    .typeError('Stock must be a number'),
  description: Yup.string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters'),
  image: Yup.string()
    .url('Must be a valid URL')
    .required('Image URL is required')
});

export default function ProductForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      await createProduct(data);
      alert('Product created successfully!');
      reset();
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Name</label>
        <input
          className={`w-full px-3 py-2 border rounded ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          }`}
          {...register('name')}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Price</label>
        <input
          type="number"
          step="0.01"
          className={`w-full px-3 py-2 border rounded ${
            errors.price ? 'border-red-500' : 'border-gray-300'
          }`}
          {...register('price')}
        />
        {errors.price && (
          <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Stock</label>
        <input
          type="number"
          className={`w-full px-3 py-2 border rounded ${
            errors.stock ? 'border-red-500' : 'border-gray-300'
          }`}
          {...register('stock')}
        />
        {errors.stock && (
          <p className="text-red-500 text-sm mt-1">{errors.stock.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Description</label>
        <textarea
          className={`w-full px-3 py-2 border rounded ${
            errors.description ? 'border-red-500' : 'border-gray-300'
          }`}
          rows={4}
          {...register('description')}
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Image URL</label>
        <input
          type="url"
          className={`w-full px-3 py-2 border rounded ${
            errors.image ? 'border-red-500' : 'border-gray-300'
          }`}
          {...register('image')}
        />
        {errors.image && (
          <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-2 px-4 rounded text-white font-medium ${
          isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {isSubmitting ? 'Creating...' : 'Create Product'}
      </button>
    </form>
  );
}