import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../../services/api';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const emptyForm = { name: '', description: '', price: '', category: 'Furniture', stock: '', image: '', material: '' };

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(null);

  const load = async () => {
    const { data } = await api.get('/admin/products');
    setProducts(data || []);
  };
  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form, price: Number(form.price), stock: Number(form.stock) };
      if (editing) await api.put(`/admin/products/${editing}`, payload);
      else await api.post('/admin/products', payload);
      toast.success(editing ? 'Updated' : 'Created');
      setShow(false);
      setEditing(null);
      setForm(emptyForm);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed');
    }
  };

  const remove = async (id) => {
    if (!window.confirm('Delete?')) return;
    await api.delete(`/admin/products/${id}`);
    toast.success('Deleted');
    load();
  };

  const edit = (p) => {
    setForm({ ...emptyForm, ...p });
    setEditing(p._id);
    setShow(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <button onClick={() => { setEditing(null); setForm(emptyForm); setShow(true); }} className="btn-primary text-sm flex items-center gap-2">
          <FaPlus /> Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((p) => (
          <div key={p._id} className="bg-white rounded-xl shadow overflow-hidden">
            <img src={p.image || p.images?.[0] || 'https://via.placeholder.com/400'} alt={p.name} className="w-full h-40 object-cover" />
            <div className="p-4">
              <div className="text-xs text-green-600 font-semibold">{p.category}</div>
              <div className="font-semibold">{p.name}</div>
              <div className="flex justify-between mt-2 items-center">
                <span className="text-lg font-bold text-green-700">₹ {p.price}</span>
                <span className="text-xs text-gray-500">Stock: {p.stock}</span>
              </div>
              <div className="flex gap-2 mt-3">
                <button onClick={() => edit(p)} className="flex-1 bg-blue-500 text-white py-1.5 rounded text-sm flex items-center justify-center gap-1"><FaEdit /> Edit</button>
                <button onClick={() => remove(p._id)} className="flex-1 bg-red-500 text-white py-1.5 rounded text-sm flex items-center justify-center gap-1"><FaTrash /> Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {show && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">{editing ? 'Edit' : 'Add'} Product</h2>
            <form onSubmit={submit} className="space-y-3">
              <input className="input" placeholder="Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <textarea className="input" placeholder="Description" required rows="2" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              <input className="input" type="number" placeholder="Price" required value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
              <select className="input" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                {['Furniture', 'Decor', 'Stationery', 'Planters', 'Bags', 'Electronics'].map((c) => <option key={c}>{c}</option>)}
              </select>
              <input className="input" type="number" placeholder="Stock" required value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
              <input className="input" placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
              <input className="input" placeholder="Material" value={form.material} onChange={(e) => setForm({ ...form, material: e.target.value })} />
              <div className="flex gap-2">
                <button type="submit" className="flex-1 btn-primary text-sm">{editing ? 'Update' : 'Create'}</button>
                <button type="button" onClick={() => setShow(false)} className="flex-1 bg-gray-300 py-2 rounded-lg text-sm">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}