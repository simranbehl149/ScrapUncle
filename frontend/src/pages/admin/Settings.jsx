import React, { useState } from 'react';
import toast from 'react-hot-toast';

export default function AdminSettings() {
  const admin = JSON.parse(localStorage.getItem('admin') || '{}');
  const [form, setForm] = useState({ fullName: admin.fullName || '', email: admin.email || '' });

  const submit = (e) => {
    e.preventDefault();
    localStorage.setItem('admin', JSON.stringify({ ...admin, ...form }));
    toast.success('Settings saved');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Settings</h1>
      <form onSubmit={submit} className="bg-white rounded-xl shadow p-6 max-w-lg space-y-4">
        <input className="input" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} placeholder="Full name" />
        <input className="input" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" />
        <button type="submit" className="btn-primary">Save</button>
      </form>
    </div>
  );
}