import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../../services/api';
import { FaTrash } from 'react-icons/fa';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const load = async () => {
    const { data } = await api.get('/admin/orders');
    setOrders(Array.isArray(data) ? data : []);
  };
  useEffect(() => { load(); }, []);

  const setStatus = async (id, status) => {
    await api.put(`/admin/orders/${id}/status`, { status });
    toast.success('Updated');
    load();
  };

  const remove = async (id) => {
    if (!window.confirm('Delete?')) return;
    await api.delete(`/admin/orders/${id}`);
    toast.success('Deleted');
    load();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Orders</h1>
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3 text-left">Order</th>
              <th className="px-4 py-3 text-left">Customer</th>
              <th className="px-4 py-3 text-left">Items</th>
              <th className="px-4 py-3 text-left">Total</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y">
            {orders.map((o) => (
              <tr key={o._id}>
                <td className="px-4 py-3">{o.orderId}</td>
                <td className="px-4 py-3">{o.userId?.fullName || '—'}</td>
                <td className="px-4 py-3">{o.products?.length} items</td>
                <td className="px-4 py-3 font-semibold text-green-700">₹ {o.totalAmount}</td>
                <td className="px-4 py-3">
                  <select value={o.status} onChange={(e) => setStatus(o._id, e.target.value)} className="text-xs border rounded px-2 py-1">
                    {['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((s) => <option key={s}>{s}</option>)}
                  </select>
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => remove(o._id)} className="text-red-600"><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && <p className="p-6 text-center text-gray-500">No orders</p>}
      </div>
    </div>
  );
}