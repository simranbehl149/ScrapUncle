import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const admin = JSON.parse(localStorage.getItem('admin') || '{}');

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar collapsed={collapsed} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header collapsed={collapsed} setCollapsed={setCollapsed} admin={admin} />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}