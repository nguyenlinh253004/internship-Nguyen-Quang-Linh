import React, { useState, useEffect } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../api/products';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const schema = Yup.object({ name: Yup.string().required(), price: Yup.number().positive().required() });

export default function AdminProductList() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const { register, handleSubmit, setValue, reset, formState: { errors } } =
    useForm({ resolver: yupResolver(schema) });

  const fetchAll = async () => {
    const res = await getProducts();
    setProducts(res.data.data || res.data);
  };

  useEffect(() => { fetchAll(); }, []);

  const onCreate = async (data) => { await createProduct(data); reset(); fetchAll(); };
  const onUpdate = async (data) => { await updateProduct(editingId, data); reset(); setEditingId(null); fetchAll(); };
  const onEditClick = (prod) => { setEditingId(prod.id); setValue('name', prod.name); setValue('price', prod.price); };
  const onDelete = async (id) => { if (window.confirm('Xóa sản phẩm?')) { await deleteProduct(id); fetchAll(); } };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit(editingId ? onUpdate : onCreate)} className="flex gap-2">
        <input className="border p-2" placeholder="Name" {...register('name')} />
        {errors.name && <span className="text-red-500">{errors.name.message}</span>}
        <input className="border p-2" placeholder="Price" type="number" {...register('price')} />
        {errors.price && <span className="text-red-500">{errors.price.message}</span>}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          {editingId ? 'Update' : 'Add'}
        </button>
        {editingId && <button type="button" onClick={() => { reset(); setEditingId(null); }} className="bg-gray-500 text-white px-4 py-2">Cancel</button>}
      </form>
      <ul className="grid grid-cols-3 gap-4">
        {products.map(p => (
          <li key={p.id} className="border p-4 rounded space-y-2">
            <h3 className="font-bold">{p.name}</h3>
            <p>{p.price}₫</p>
            <button onClick={() => onEditClick(p)} className="bg-yellow-400 px-2 py-1">Edit</button>
            <button onClick={() => onDelete(p.id)} className="bg-red-500 text-white px-2 py-1">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}