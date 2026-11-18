import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import api from '../services/api';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/contact', form);
      toast.success('Message sent!');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid lg:grid-cols-2 gap-12">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-6">Send us a message</h2>
        <form onSubmit={submit} className="space-y-4">
          <input className="input" placeholder="Name *" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input className="input" type="email" placeholder="Email *" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input className="input" placeholder="Subject *" required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
          <textarea className="input" rows="5" placeholder="Message *" required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
          <button type="submit" disabled={loading} className="w-full btn-primary disabled:opacity-50">
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>

      <div className="space-y-4">
        <div className="bg-gray-50 rounded-xl p-6 flex items-start gap-4">
          <FaEnvelope className="text-2xl text-green-600 mt-1" />
          <div>
            <h3 className="font-semibold">Email</h3>
            <a href="mailto:simranbehl495@gmail.com" className="text-gray-600 hover:text-green-600">simranbehl495@gmail.com</a>
          </div>
        </div>
        <div className="bg-gray-50 rounded-xl p-6 flex items-start gap-4">
          <FaPhone className="text-2xl text-green-600 mt-1" />
          <div>
            <h3 className="font-semibold">Phone</h3>
            <a href="tel:+918427690277" className="text-gray-600 hover:text-green-600">+91 8427690277</a>
          </div>
        </div>
        <div className="bg-gray-50 rounded-xl p-6 flex items-start gap-4">
          <FaMapMarkerAlt className="text-2xl text-green-600 mt-1" />
          <div>
            <h3 className="font-semibold">HQ</h3>
            <p className="text-gray-600">Mukerian, Punjab</p>
          </div>
        </div>
      </div>
    </div>
  );
}