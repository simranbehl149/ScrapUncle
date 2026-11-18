import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    fullName: user?.fullName || '',
    phone: user?.phone || '',
    address: user?.address || { houseNo: '', street: '', city: '', pincode: '' },
  });

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const setAddr = (k) => (e) => setForm({ ...form, address: { ...form.address, [k]: e.target.value } });

  const save = async (e) => {
    e.preventDefault();
    const ok = await updateProfile(form);
    if (ok) setEditing(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-green-800 text-white px-6 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">My Profile</h1>
            <p className="text-green-100 text-sm">{user?.email}</p>
          </div>
          <button onClick={() => setEditing(!editing)} className="bg-white text-green-700 px-4 py-2 rounded-lg font-semibold">
            {editing ? 'Cancel' : 'Edit'}
          </button>
        </div>

        <form onSubmit={save} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input className="input" disabled={!editing} value={form.fullName} onChange={set('fullName')} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email (locked)</label>
            <input className="input bg-gray-100" disabled value={user?.email || ''} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input className="input" disabled={!editing} value={form.phone} onChange={set('phone')} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <div className="space-y-2">
              <input className="input" disabled={!editing} placeholder="House / Flat" value={form.address.houseNo} onChange={setAddr('houseNo')} />
              <input className="input" disabled={!editing} placeholder="Street" value={form.address.street} onChange={setAddr('street')} />
              <div className="grid grid-cols-2 gap-2">
                <input className="input" disabled={!editing} placeholder="City" value={form.address.city} onChange={setAddr('city')} />
                <input className="input" disabled={!editing} placeholder="Pincode" value={form.address.pincode} onChange={setAddr('pincode')} />
              </div>
            </div>
          </div>
          {editing && <button type="submit" className="btn-primary w-full">Save Changes</button>}
        </form>
      </div>
    </div>
  );
}