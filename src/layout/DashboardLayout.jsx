// src/layout/DashboardLayout.jsx
import React from "react";
import Sidebar from "./Sidebar.jsx";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-[#f4f7fe] min-h-screen p-6">
        {children}
      </main>
    </div>
  );
}
