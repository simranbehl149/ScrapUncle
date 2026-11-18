import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  FaRecycle, FaHome, FaUsers, FaTruck, FaBox, FaShoppingCart,
  FaChartLine, FaCog, FaSignOutAlt,
} from 'react-icons/fa';

const items = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: FaHome, end: true },
  { to: '/admin/users', label: 'Users', icon: FaUsers },
  { to: '/admin/pickups', label: 'Pickups', icon: FaTruck },
  { to: '/admin/products', label: 'Products', icon: FaBox },
  { to: '/admin/orders', label: 'Orders', icon: FaShoppingCart },
  { to: '/admin/analytics', label: 'Analytics', icon: FaChartLine },
  { to: '/admin/settings', label: 'Settings', icon: FaCog },
];

export default function Sidebar({ collapsed }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('admin');
    toast.success('Logged out');
    navigate('/admin');
  };

  return (
    <aside className={`${collapsed ? 'w-20' : 'w-64'} bg-gray-900 text-white flex flex-col transition-all`}>
      <div className="p-4 border-b border-gray-800 flex items-center gap-3">
        <div className="bg-green-500 p-2 rounded-lg">
          <FaRecycle />
        </div>
        {!collapsed && (
          <div>
            <div className="font-bold">ScrapUncle</div>
            <div className="text-xs text-gray-400">Admin</div>
          </div>
        )}
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {items.map((it) => (
          <NavLink
            key={it.to}
            to={it.to}
            end={it.end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg ${
                isActive ? 'bg-green-600' : 'text-gray-300 hover:bg-gray-800'
              } ${collapsed ? 'justify-center' : ''}`
            }
          >
            <it.icon />
            {!collapsed && <span>{it.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-gray-800">
        <button onClick={logout} className={`w-full flex items-center gap-3 px-3 py-2 text-red-400 hover:bg-red-600 hover:text-white rounded-lg ${collapsed ? 'justify-center' : ''}`}>
          <FaSignOutAlt /> {!collapsed && 'Logout'}
        </button>
      </div>
    </aside>
  );
}