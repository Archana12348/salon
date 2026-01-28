import React from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import Sidebar from "./AdminSidebar";

export default function AdminLayout() {
  return (
    <>
      <AdminHeader />

      <div className="flex min-h-screen">
        <aside className="fixed top-16 left-0 w-64 h-[calc(100vh-64px)] border-r-2 border-black">
          <Sidebar />
        </aside>
        <main className="flex-1 ml-64 mt-16 p-6 overflow-y-auto  min-h-[calc(100vh-64px)]">
          <Outlet />
        </main>
      </div>
    </>
  );
}
