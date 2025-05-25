// src/layout/DashboardLayout.jsx
import React from "react";
import Sidebar from "../layout/Sidebar.jsx";
import Topbar from "../layout/Topbar.jsx";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#f4f7fe]">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Topbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}