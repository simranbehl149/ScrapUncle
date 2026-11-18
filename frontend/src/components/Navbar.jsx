import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaRecycle, FaBars, FaTimes, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/marketplace', label: 'Marketplace' },
    { to: '/sell-scrap', label: 'Sell Scrap' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-green-600 p-2 rounded-lg">
            <FaRecycle className="text-white" />
          </div>
          <span className="font-bold text-xl text-green-800">ScrapUncle</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-sm font-medium ${isActive ? 'text-green-700' : 'text-gray-700 hover:text-green-700'}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <Link to="/dashboard" className="text-sm font-medium text-gray-700 hover:text-green-700 flex items-center gap-1">
                <FaUser /> {user.fullName?.split(' ')[0]}
              </Link>
              <button
                onClick={() => { logout(); navigate('/'); }}
                className="text-sm font-medium text-red-600 hover:text-red-700 flex items-center gap-1"
              >
                <FaSignOutAlt /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signin" className="text-sm font-medium text-gray-700 hover:text-green-700">Sign in</Link>
              <Link to="/signup" className="btn-primary text-sm py-2 px-4">Sign up</Link>
            </>
          )}
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden text-gray-700 text-xl">
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t px-4 py-3 space-y-2 bg-white">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="block py-2 text-gray-700"
            >
              {l.label}
            </NavLink>
          ))}
          {user ? (
            <>
              <Link to="/dashboard" onClick={() => setOpen(false)} className="block py-2 text-gray-700">Dashboard</Link>
              <button
                onClick={() => { logout(); navigate('/'); setOpen(false); }}
                className="block py-2 text-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signin" onClick={() => setOpen(false)} className="block py-2">Sign in</Link>
              <Link to="/signup" onClick={() => setOpen(false)} className="block py-2 text-green-700 font-semibold">Sign up</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;