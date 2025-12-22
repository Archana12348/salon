import React from "react";
import { Outlet, Link } from "react-router-dom";
import AdminHeader from "./AdminHeader";

export default function AdminLayout() {
  return (
    <>
      {/* Header */}
      <AdminHeader />

      {/* Main Layout */}
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-60 bg-gray-900 text-white p-4">
          <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
          <nav className="flex flex-col gap-2">
            <Link to="/admin/dashboard">Dashboard</Link>
            <Link to="/admin/products">Products</Link>
            <Link to="/admin/users">Users</Link>
          </nav>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-800">
          <Outlet />
        </main>
      </div>
    </>
  );
}
