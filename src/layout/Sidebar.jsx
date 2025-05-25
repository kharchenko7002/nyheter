// src/layout/Sidebar.jsx
import React from "react";
import { Home, User, LogOut } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-md px-6 py-8 hidden md:block">
      <h2 className="text-2xl font-bold mb-8 text-purple-700">medietilsynet</h2>
      <nav className="space-y-4">
        <a href="#" className="flex items-center gap-3 text-gray-700 hover:text-purple-600">
          <Home size={20} /> Dashboard
        </a>
        <a href="#" className="flex items-center gap-3 text-gray-700 hover:text-purple-600">
          <User size={20} /> Profil
        </a>
        <a href="#" className="flex items-center gap-3 text-gray-700 hover:text-purple-600">
          <LogOut size={20} /> Logg ut
        </a>
      </nav>
    </aside>
  );
}