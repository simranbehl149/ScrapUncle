import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaTruck, FaBoxOpen } from 'react-icons/fa';
import api from '../services/api';

export default function OrderSuccess() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/orders/${id}`)
      .then((r) => setOrder(r.data))
      .catch(() => setOrder(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin h-12 w-12 rounded-full border-b-2 border-green-600" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-md mx-auto text-center py-20 px-4">
        <h2 className="text-2xl font-bold mb-2">Order not found</h2>
        <Link to="/my-orders" className="btn-primary inline-block mt-4">View my orders</Link>
      </div>
    );
  }

  const eta = new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
  });

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 180, damping: 15 }}
        className="flex justify-center mb-6"
      >
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
          <FaCheckCircle className="text-5xl text-green-600" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="text-center mb-10"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order confirmed</h1>
        <p className="text-gray-600">
          Thanks {order.shippingAddress?.fullName?.split(' ')[0] || 'for your order'}. We've sent a confirmation to your account.
        </p>
        <p className="mt-2 text-sm text-gray-500">
          Order ID: <span className="font-mono font-semibold text-gray-800">{order.orderId}</span>
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="bg-white rounded-xl shadow-md border overflow-hidden"
      >
        <div className="p-4 border-b bg-gray-50 flex items-center gap-3">
          <FaTruck className="text-green-700" />
          <div>
            <div className="text-sm font-medium">Estimated delivery</div>
            <div className="text-xs text-gray-600">{eta}</div>
          </div>
        </div>

        <div className="p-5 space-y-3">
          {order.products.map((p, i) => (
            <div key={i} className="flex gap-3 items-center">
              <img src={p.image} alt={p.name} className="w-14 h-14 rounded object-cover" />
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{p.name}</div>
                <div className="text-xs text-gray-500">Qty: {p.quantity}</div>
              </div>
              <div className="font-semibold">₹ {(p.price * p.quantity).toLocaleString()}</div>
            </div>
          ))}
        </div>

        <div className="p-5 border-t bg-gray-50 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Paying by <span className="font-medium text-gray-800">{order.paymentMethod}</span>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500">Total paid</div>
            <div className="text-xl font-bold text-green-700">₹ {order.totalAmount.toLocaleString()}</div>
          </div>
        </div>
      </motion.div>

      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        <Link to="/my-orders" className="btn-outline text-center inline-flex items-center justify-center gap-2">
          <FaBoxOpen /> Track my order
        </Link>
        <Link to="/marketplace" className="btn-primary text-center inline-block">
          Continue shopping
        </Link>
      </div>
    </div>
  );
}