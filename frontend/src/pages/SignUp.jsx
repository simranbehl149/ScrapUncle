import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

export default function SignUp() {
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) return toast.error('Passwords do not match');
    if (form.password.length < 6) return toast.error('Password must be at least 6 characters');
    setLoading(true);
    const ok = await register(form.fullName, form.email, form.password, form.phone);
    setLoading(false);
    if (ok) navigate('/dashboard');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-2">Create Account</h2>
        <p className="text-center text-gray-600 mb-8">Join the circular economy</p>

        <form onSubmit={submit} className="space-y-4">
          <input className="input" placeholder="Full name" required value={form.fullName} onChange={set('fullName')} />
          <input type="email" className="input" placeholder="Email" required value={form.email} onChange={set('email')} />
          <input className="input" placeholder="Phone" required value={form.phone} onChange={set('phone')} />
          <input type="password" className="input" placeholder="Password (min 6)" required value={form.password} onChange={set('password')} />
          <input type="password" className="input" placeholder="Confirm password" required value={form.confirm} onChange={set('confirm')} />
          <button type="submit" disabled={loading} className="w-full btn-primary disabled:opacity-50">
            {loading ? 'Creating...' : 'Create Account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account? <Link to="/signin" className="text-green-700 font-semibold">Sign in</Link>
        </p>
      </div>
    </div>
  );
}