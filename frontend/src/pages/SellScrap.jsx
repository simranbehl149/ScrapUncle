import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const CATEGORIES = [
  { name: 'Paper', rate: 12, icon: '📄' },
  { name: 'Plastic', rate: 18, icon: '🥤' },
  { name: 'Metal', rate: 45, icon: '🔩' },
  { name: 'Cardboard', rate: 10, icon: '📦' },
  { name: 'Glass', rate: 6, icon: '🍾' },
  { name: 'E-Waste', rate: 60, icon: '💻' },
];

export default function SellScrap() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    category: '',
    weight: '',
    address: { houseNo: '', street: '', city: '', pincode: '' },
    preferredDate: '',
    contactNumber: user?.phone || '',
    notes: '',
  });

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const setAddr = (k, v) => setForm((f) => ({ ...f, address: { ...f.address, [k]: v } }));

  const categoryInfo = CATEGORIES.find((c) => c.name === form.category);
  const estimate = categoryInfo && form.weight ? categoryInfo.rate * parseFloat(form.weight || 0) : 0;

  const submit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please sign in first');
      return navigate('/signin');
    }
    if (!form.category || !form.weight || !form.preferredDate || !form.contactNumber) {
      return toast.error('Fill all required fields');
    }
    setSubmitting(true);
    try {
      await api.post('/pickups', form);
      toast.success('Pickup scheduled!');
      navigate('/my-pickups');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="max-w-md mx-auto text-center py-20 px-4">
        <h2 className="text-2xl font-bold mb-4">Sign in to sell scrap</h2>
        <Link to="/signin" className="btn-primary inline-block">Sign In</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 grid lg:grid-cols-3 gap-8">
      <form onSubmit={submit} className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6 space-y-5">
        <h1 className="text-2xl font-bold">Schedule a pickup</h1>

        <div>
          <label className="block text-sm font-medium mb-2">Scrap category *</label>
          <select className="input" required value={form.category} onChange={(e) => set('category', e.target.value)}>
            <option value="">Select</option>
            {CATEGORIES.map((c) => (
              <option key={c.name} value={c.name}>{c.icon} {c.name} — ₹ {c.rate}/kg</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Approx. weight (kg) *</label>
          <input type="number" min="0" step="0.1" className="input" required value={form.weight} onChange={(e) => set('weight', e.target.value)} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Pickup address</label>
          <div className="space-y-2">
            <input className="input" placeholder="House / Flat no" value={form.address.houseNo} onChange={(e) => setAddr('houseNo', e.target.value)} />
            <input className="input" placeholder="Street" value={form.address.street} onChange={(e) => setAddr('street', e.target.value)} />
            <div className="grid grid-cols-2 gap-2">
              <input className="input" placeholder="City" value={form.address.city} onChange={(e) => setAddr('city', e.target.value)} />
              <input className="input" placeholder="Pincode" value={form.address.pincode} onChange={(e) => setAddr('pincode', e.target.value)} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Pickup date *</label>
            <input type="date" className="input" required min={new Date().toISOString().split('T')[0]} value={form.preferredDate} onChange={(e) => set('preferredDate', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Contact number *</label>
            <input className="input" required value={form.contactNumber} onChange={(e) => set('contactNumber', e.target.value)} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Notes (optional)</label>
          <textarea className="input" rows="2" value={form.notes} onChange={(e) => set('notes', e.target.value)} />
        </div>

        {estimate > 0 && (
          <div className="bg-green-50 rounded-lg p-4 flex justify-between items-center">
            <span className="text-gray-700">Estimated payout</span>
            <span className="text-2xl font-bold text-green-700">₹ {estimate}</span>
          </div>
        )}

        <button type="submit" disabled={submitting} className="w-full btn-primary disabled:opacity-50">
          {submitting ? 'Scheduling...' : 'Request Pickup'}
        </button>
      </form>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="font-semibold mb-4">Current rates</h3>
        <div className="space-y-2 text-sm">
          {CATEGORIES.map((c) => (
            <div key={c.name} className="flex justify-between border-b py-2">
              <span>{c.icon} {c.name}</span>
              <span className="font-semibold">₹ {c.rate}/kg</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}