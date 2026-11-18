import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { FaBox } from 'react-icons/fa';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get('/orders');
        setOrders(Array.isArray(data) ? data : []);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin h-12 w-12 rounded-full border-b-2 border-green-600" /></div>;

  if (orders.length === 0) {
    return (
      <div className="max-w-md mx-auto py-20 text-center px-4">
        <FaBox className="text-6xl text-gray-300 mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
        <p className="text-gray-500 mb-6">Start shopping for eco-friendly products!</p>
        <Link to="/marketplace" className="btn-primary inline-block">Browse Marketplace</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-4">
      <h1 className="text-3xl font-bold mb-4">My Orders</h1>
      {orders.map((o) => (
        <div key={o._id} className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-4 bg-gray-50 border-b flex justify-between items-center flex-wrap gap-2">
            <div>
              <div className="text-sm text-gray-500">Order #{o.orderId}</div>
              <div className="text-xs text-gray-500">{new Date(o.createdAt).toLocaleDateString()}</div>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              o.status === 'Delivered' ? 'bg-green-100 text-green-800'
              : o.status === 'Shipped' ? 'bg-blue-100 text-blue-800'
              : o.status === 'Cancelled' ? 'bg-red-100 text-red-800'
              : 'bg-yellow-100 text-yellow-800'
            }`}>{o.status}</span>
          </div>
          <div className="p-4 space-y-2">
            {o.products.map((p, i) => (
              <div key={i} className="flex gap-3 items-center border-b last:border-0 py-2">
                <img src={p.image} alt={p.name} className="w-14 h-14 object-cover rounded" />
                <div className="flex-1">
                  <div className="font-medium">{p.name}</div>
                  <div className="text-sm text-gray-500">Qty: {p.quantity}</div>
                </div>
                <div className="font-semibold text-green-700">₹ {p.price}</div>
              </div>
            ))}
          </div>
          <div className="p-4 bg-gray-50 flex justify-between items-center">
            <div className="text-sm text-gray-600">Delivering to {o.shippingAddress?.city}</div>
            <div className="text-right">
              <div className="text-xs text-gray-500">Total</div>
              <div className="text-xl font-bold text-green-700">₹ {o.totalAmount}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}