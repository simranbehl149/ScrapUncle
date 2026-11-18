import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../services/api';
import { FaTruck } from 'react-icons/fa';

export default function MyPickups() {
  const [pickups, setPickups] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const { data } = await api.get('/pickups');
      setPickups(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const cancel = async (id) => {
    if (!window.confirm('Cancel this pickup?')) return;
    try {
      await api.put(`/pickups/${id}/cancel`);
      toast.success('Cancelled');
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed');
    }
  };

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin h-12 w-12 rounded-full border-b-2 border-green-600" /></div>;

  const stats = {
    total: pickups.length,
    completed: pickups.filter((p) => p.status === 'Completed').length,
    pending: pickups.filter((p) => ['Pending', 'Scheduled'].includes(p.status)).length,
    earnings: pickups.filter((p) => p.status === 'Completed').reduce((s, p) => s + p.amount, 0),
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Pickups</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          ['Total', stats.total, 'text-gray-800'],
          ['Completed', stats.completed, 'text-green-600'],
          ['Pending', stats.pending, 'text-yellow-600'],
          ['Earnings', `₹ ${stats.earnings}`, 'text-green-600'],
        ].map(([label, val, color]) => (
          <div key={label} className="bg-white rounded-xl shadow-md p-4 text-center">
            <div className={`text-2xl font-bold ${color}`}>{val}</div>
            <div className="text-xs text-gray-500">{label}</div>
          </div>
        ))}
      </div>

      {pickups.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <FaTruck className="text-6xl text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No pickups scheduled</h3>
          <Link to="/sell-scrap" className="btn-primary inline-block mt-4">Schedule Pickup</Link>
        </div>
      ) : (
        <div className="space-y-3">
          {pickups.map((p) => (
            <div key={p._id} className="bg-white rounded-xl shadow-md p-4">
              <div className="flex justify-between items-center flex-wrap gap-2 mb-3">
                <div>
                  <div className="font-medium">{p.pickupId}</div>
                  <div className="text-xs text-gray-500">
                    {new Date(p.preferredDate).toLocaleDateString()}
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  p.status === 'Completed' ? 'bg-green-100 text-green-800'
                  : p.status === 'Scheduled' ? 'bg-blue-100 text-blue-800'
                  : p.status === 'Cancelled' ? 'bg-red-100 text-red-800'
                  : 'bg-yellow-100 text-yellow-800'
                }`}>{p.status}</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div><div className="text-gray-500">Category</div><div className="font-medium">{p.category}</div></div>
                <div><div className="text-gray-500">Weight</div><div className="font-medium">{p.weight} kg</div></div>
                <div><div className="text-gray-500">Amount</div><div className="font-medium text-green-700">₹ {p.amount}</div></div>
                <div><div className="text-gray-500">Address</div><div className="font-medium">{p.address?.city}</div></div>
              </div>
              {['Pending', 'Scheduled'].includes(p.status) && (
                <button onClick={() => cancel(p._id)} className="mt-3 text-sm text-red-600 hover:text-red-700 font-semibold">
                  Cancel Pickup
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}