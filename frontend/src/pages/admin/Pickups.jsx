import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../../services/api';
import { FaTrash } from 'react-icons/fa';

export default function AdminPickups() {
  const [pickups, setPickups] = useState([]);

  const load = async () => {
    const { data } = await api.get('/admin/pickups');
    setPickups(data.pickups || []);
  };
  useEffect(() => { load(); }, []);

  const updateStatus = async (id, status) => {
    await api.put(`/admin/pickups/${id}/status`, { status });
    toast.success('Updated');
    load();
  };

  const remove = async (id) => {
    if (!window.confirm('Delete?')) return;
    await api.delete(`/admin/pickups/${id}`);
    toast.success('Deleted');
    load();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Pickups</h1>
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">User</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Weight</th>
              <th className="px-4 py-3 text-left">Amount</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y">
            {pickups.map((p) => (
              <tr key={p._id}>
                <td className="px-4 py-3">{p.pickupId}</td>
                <td className="px-4 py-3">{p.userId?.fullName || '—'}</td>
                <td className="px-4 py-3">{p.category}</td>
                <td className="px-4 py-3">{p.weight} kg</td>
                <td className="px-4 py-3 text-green-700 font-semibold">₹ {p.amount}</td>
                <td className="px-4 py-3">
                  <select value={p.status} onChange={(e) => updateStatus(p._id, e.target.value)} className="text-xs border rounded px-2 py-1">
                    <option>Pending</option>
                    <option>Scheduled</option>
                    <option>Completed</option>
                    <option>Cancelled</option>
                  </select>
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => remove(p._id)} className="text-red-600"><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {pickups.length === 0 && <p className="p-6 text-center text-gray-500">No pickups</p>}
      </div>
    </div>
  );
}