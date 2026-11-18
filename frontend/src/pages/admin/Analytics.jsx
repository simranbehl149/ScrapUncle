import React, { useEffect, useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend,
} from 'chart.js';
import api from '../../services/api';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

export default function AdminAnalytics() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get('/admin/dashboard').then((r) => setStats(r.data));
  }, []);

  if (!stats) return <div className="text-gray-500">Loading…</div>;

  const revenueData = {
    labels: ['Pickups Completed', 'Pending', 'Total Users', 'Total Orders'],
    datasets: [{
      label: 'Counts',
      data: [stats.completedPickups, stats.pendingPickups, stats.totalUsers, stats.totalOrders],
      backgroundColor: ['#22c55e', '#facc15', '#3b82f6', '#a855f7'],
    }],
  };

  const wasteData = {
    labels: ['Recycled', 'CO₂ Saved'],
    datasets: [{
      data: [stats.totalWasteRecycled, stats.totalCO2Saved],
      backgroundColor: ['#22c55e', '#10b981'],
    }],
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Analytics</h1>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="font-semibold mb-4">Platform Overview</h3>
          <Bar data={revenueData} options={{ responsive: true }} />
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="font-semibold mb-4">Environmental Impact</h3>
          <div className="w-64 mx-auto"><Doughnut data={wasteData} /></div>
        </div>
      </div>
    </div>
  );
}