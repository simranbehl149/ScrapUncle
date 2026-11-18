import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../../services/api';
import { FaRecycle } from 'react-icons/fa';

export default function AdminLogin() {
  const [email, setEmail] = useState('admin@scrapuncle.com');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/admin/login', { email, password });
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('admin', JSON.stringify({ _id: data._id, fullName: data.fullName, email: data.email }));
      toast.success('Welcome, Admin');
      navigate('/admin/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-6">
          <div className="inline-flex p-4 bg-green-600 rounded-2xl mb-3">
            <FaRecycle className="text-3xl text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Portal</h1>
        </div>

        <form onSubmit={submit} className="bg-white rounded-2xl shadow-2xl p-8 space-y-4">
          <input type="email" className="input" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          <input type="password" className="input" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          <button type="submit" disabled={loading} className="w-full btn-primary disabled:opacity-50">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
          <p className="text-xs text-gray-500 text-center pt-2 border-t">
            Default: admin@scrapuncle.com / admin123
          </p>
        </form>
      </div>
    </div>
  );
}