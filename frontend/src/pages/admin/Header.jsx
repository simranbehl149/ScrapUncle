import React from 'react';
import { FaBars } from 'react-icons/fa';

export default function Header({ collapsed, setCollapsed, admin }) {
  return (
    <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <button onClick={() => setCollapsed(!collapsed)} className="p-2 hover:bg-gray-100 rounded">
          <FaBars />
        </button>
        <h1 className="text-lg font-semibold">Welcome, {admin?.fullName?.split(' ')[0] || 'Admin'}</h1>
      </div>
      <div className="w-9 h-9 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
        {(admin?.fullName || 'A')[0]}
      </div>
    </header>
  );
}