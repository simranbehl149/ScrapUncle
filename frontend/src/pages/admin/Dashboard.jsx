import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { FaUsers, FaTruck, FaMoneyBillWave, FaRecycle, FaLeaf, FaShoppingCart } from 'react-icons/fa';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get('/admin/dashboard').then((r) => setStats(r.data)).catch(() => setStats({}));
  }, []);

  if (!stats) return <div className="flex justify-center py-20"><div className="animate-spin h-12 w-12 rounded-full border-b-2 border-green-600" /></div>;

  const cards = [
    { icon: FaUsers, label: 'Users', value: stats.totalUsers },
    { icon: FaTruck, label: 'Pickups', value: stats.totalPickups },
    { icon: FaMoneyBillWave, label: 'Revenue', value: `₹ ${(stats.totalRevenue || 0).toLocaleString()}` },
    { icon: FaRecycle, label: 'Waste Recycled', value: `${((stats.totalWasteRecycled || 0) / 1000).toFixed(1)}T` },
    { icon: FaLeaf, label: 'CO₂ Saved', value: `${((stats.totalCO2Saved || 0) / 1000).toFixed(1)}T` },
    { icon: FaShoppingCart, label: 'Orders', value: stats.totalOrders },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Overview</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="bg-white rounded-xl shadow p-4">
            <c.icon className="text-green-600 text-xl mb-2" />
            <div className="text-2xl font-bold">{c.value}</div>
            <div className="text-sm text-gray-500">{c.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}