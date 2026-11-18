import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { FaRupeeSign, FaTruck, FaRecycle, FaLeaf, FaArrowRight } from 'react-icons/fa';

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="bg-white rounded-xl shadow-md p-6">
    <div className={`${color} p-3 rounded-full inline-block mb-3`}>
      <Icon className="text-xl" />
    </div>
    <div className="text-2xl font-bold">{value}</div>
    <div className="text-gray-500 text-sm">{label}</div>
  </div>
);

export default function Dashboard() {
  const { user } = useAuth();
  const [data, setData] = useState({
    totalEarnings: 0, completedPickups: 0, totalWaste: 0, totalCO2Saved: 0,
    recentPickups: [], recentOrders: [],
  });
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const { data: d } = await api.get('/dashboard');
      setData(d);
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  if (loading) {
    return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600" /></div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-1">Welcome back, {user?.fullName?.split(' ')[0]}! 👋</h1>
      <p className="text-gray-600 mb-8">Here's your recycling journey</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard icon={FaRupeeSign} label="Total Earnings" value={`₹ ${data.totalEarnings}`} color="bg-green-100 text-green-700" />
        <StatCard icon={FaTruck} label="Pickups Completed" value={data.completedPickups} color="bg-blue-100 text-blue-700" />
        <StatCard icon={FaRecycle} label="Waste Recycled" value={`${data.totalWaste} kg`} color="bg-purple-100 text-purple-700" />
        <StatCard icon={FaLeaf} label="CO₂ Saved" value={`${data.totalCO2Saved} kg`} color="bg-teal-100 text-teal-700" />
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b flex justify-between items-center">
            <h3 className="font-semibold">Recent Pickups</h3>
            <Link to="/my-pickups" className="text-sm text-green-700 flex items-center gap-1">View All <FaArrowRight /></Link>
          </div>
          {data.recentPickups.length === 0 ? (
            <p className="p-6 text-center text-gray-500 text-sm">No pickups yet</p>
          ) : (
            <div className="divide-y">
              {data.recentPickups.map((p) => (
                <div key={p._id} className="p-4 flex justify-between">
                  <div>
                    <div className="font-medium">{p.pickupId}</div>
                    <div className="text-xs text-gray-500">{new Date(p.preferredDate).toLocaleDateString()}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-green-700">₹ {p.amount}</div>
                    <div className="text-xs text-gray-500">{p.status}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b flex justify-between items-center">
            <h3 className="font-semibold">Recent Orders</h3>
            <Link to="/my-orders" className="text-sm text-green-700 flex items-center gap-1">View All <FaArrowRight /></Link>
          </div>
          {data.recentOrders.length === 0 ? (
            <p className="p-6 text-center text-gray-500 text-sm">No orders yet</p>
          ) : (
            <div className="divide-y">
              {data.recentOrders.map((o) => (
                <div key={o._id} className="p-4 flex justify-between">
                  <div>
                    <div className="font-medium">{o.orderId}</div>
                    <div className="text-xs text-gray-500">{new Date(o.createdAt).toLocaleDateString()}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-green-700">₹ {o.totalAmount}</div>
                    <div className="text-xs text-gray-500">{o.status}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/sell-scrap" className="bg-yellow-400 rounded-xl p-4 text-center hover:shadow-lg transition">
          <div className="text-2xl mb-1">🏠</div>
          <div className="font-semibold">Schedule Pickup</div>
        </Link>
        <Link to="/marketplace" className="bg-blue-500 text-white rounded-xl p-4 text-center hover:shadow-lg transition">
          <div className="text-2xl mb-1">🛍️</div>
          <div className="font-semibold">Shop Recycled</div>
        </Link>
        <Link to="/profile" className="bg-purple-500 text-white rounded-xl p-4 text-center hover:shadow-lg transition">
          <div className="text-2xl mb-1">⚙️</div>
          <div className="font-semibold">Update Profile</div>
        </Link>
      </div>
    </div>
  );
}