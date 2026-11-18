import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaLock, FaTruck, FaMoneyBillWave, FaCreditCard, FaMobileAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';
import api from '../services/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const PAYMENT_METHODS = [
  { id: 'UPI', label: 'UPI', sub: 'Google Pay, PhonePe, Paytm', icon: FaMobileAlt },
  { id: 'Card', label: 'Card', sub: 'Credit or debit', icon: FaCreditCard },
  { id: 'Cash on Delivery', label: 'Cash on Delivery', sub: 'Pay when it arrives', icon: FaMoneyBillWave },
];

export default function Checkout() {
  const { user } = useAuth();
  const { items, subtotal, shipping, total, clear } = useCart();
  const navigate = useNavigate();

  const [submitting, setSubmitting] = useState(false);
  const [payment, setPayment] = useState('Cash on Delivery');
  const [form, setForm] = useState({
    fullName: user?.fullName || '',
    phone: user?.phone || '',
    houseNo: user?.address?.houseNo || '',
    street: user?.address?.street || '',
    city: user?.address?.city || '',
    pincode: user?.address?.pincode || '',
  });

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  if (!user) {
    return (
      <div className="max-w-md mx-auto text-center py-20 px-4">
        <FaLock className="text-4xl text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Please sign in</h2>
        <p className="text-gray-500 mb-6">You need an account to place an order.</p>
        <Link to="/signin" className="btn-primary inline-block">Sign In</Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-20 px-4">
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Add items before checking out.</p>
        <Link to="/marketplace" className="btn-primary inline-block">Browse Marketplace</Link>
      </div>
    );
  }

  const submit = async (e) => {
    e.preventDefault();
    if (!form.fullName || !form.phone || !form.city || !form.pincode) {
      return toast.error('Please complete the shipping details');
    }
    if (!/^\d{6}$/.test(form.pincode)) {
      return toast.error('Pincode must be 6 digits');
    }
    if (!/^\d{10}$/.test(form.phone.replace(/\D/g, '').slice(-10))) {
      return toast.error('Enter a valid 10-digit phone number');
    }

    setSubmitting(true);
    try {
      // Simulate payment delay for a "processing" feel
      if (payment !== 'Cash on Delivery') {
        await new Promise((r) => setTimeout(r, 900));
      }

      const { data } = await api.post('/orders', {
        products: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
        shippingAddress: {
          fullName: form.fullName,
          phone: form.phone,
          houseNo: form.houseNo,
          street: form.street,
          city: form.city,
          pincode: form.pincode,
        },
        paymentMethod: payment,
      });

      clear();
      toast.success('Order placed!');
      navigate(`/order-success/${data._id}`, { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not place order');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-1">Checkout</h1>
      <p className="text-gray-500 mb-8">One last step to make it yours.</p>

      <form onSubmit={submit} className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border p-6"
          >
            <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <FaTruck className="text-green-700" /> Shipping address
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium mb-1">Full name</label>
                <input className="input" required value={form.fullName} onChange={set('fullName')} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input className="input" required value={form.phone} onChange={set('phone')} placeholder="10-digit" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Pincode</label>
                <input className="input" required maxLength={6} value={form.pincode} onChange={set('pincode')} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">House / Flat no.</label>
                <input className="input" value={form.houseNo} onChange={set('houseNo')} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Street</label>
                <input className="input" value={form.street} onChange={set('street')} />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium mb-1">City</label>
                <input className="input" required value={form.city} onChange={set('city')} />
              </div>
            </div>
          </motion.div>

          {/* Payment */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="bg-white rounded-xl shadow-sm border p-6"
          >
            <h2 className="font-semibold text-lg mb-4">Payment method</h2>
            <div className="space-y-2">
              {PAYMENT_METHODS.map((m) => (
                <label
                  key={m.id}
                  className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition ${
                    payment === m.id ? 'border-green-600 bg-green-50/50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={m.id}
                    checked={payment === m.id}
                    onChange={() => setPayment(m.id)}
                    className="accent-green-700"
                  />
                  <m.icon className="text-green-700" />
                  <div className="flex-1">
                    <div className="font-medium text-sm">{m.label}</div>
                    <div className="text-xs text-gray-500">{m.sub}</div>
                  </div>
                </label>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-3 flex items-center gap-1.5">
              <FaLock /> No card details are stored on our servers.
            </p>
          </motion.div>
        </div>

        {/* Summary */}
        <div className="lg:sticky lg:top-24 h-fit">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="font-semibold text-lg mb-4">Your order</h2>
            <ul className="space-y-3 mb-4 max-h-72 overflow-y-auto pr-1">
              {items.map((i) => (
                <li key={i.productId} className="flex gap-3 text-sm">
                  <img src={i.image} alt={i.name} className="w-12 h-12 rounded object-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium line-clamp-2">{i.name}</div>
                    <div className="text-xs text-gray-500">Qty: {i.quantity}</div>
                  </div>
                  <div className="font-semibold">₹ {(i.price * i.quantity).toLocaleString()}</div>
                </li>
              ))}
            </ul>

            <div className="border-t pt-4 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-600">Subtotal</span><span>₹ {subtotal.toLocaleString()}</span></div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>{shipping === 0 ? <span className="text-green-600">Free</span> : `₹ ${shipping}`}</span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t">
                <span className="font-semibold">Total</span>
                <span className="text-2xl font-bold text-green-700">₹ {total.toLocaleString()}</span>
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={submitting}
              className="w-full btn-primary mt-5 disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Placing order…
                </>
              ) : (
                <>Place Order · ₹ {total.toLocaleString()}</>
              )}
            </motion.button>
          </div>
        </div>
      </form>
    </div>
  );
}