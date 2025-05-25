// src/layout/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Home, LogOut, BookOpen, Puzzle, Settings, Info, Mail, User } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-md px-6 py-8 hidden md:block">
      <h2 className="text-2xl font-bold mb-8 text-purple-700">medietilsynet</h2>
      <nav className="space-y-4">
        <Link to="/" className="flex items-center gap-3 text-gray-700 hover:text-purple-600">
          <Home size={20} /> Hjem
        </Link>
        <Link to="/bruk" className="flex items-center gap-3 text-gray-700 hover:text-purple-600">
          <BookOpen size={20} /> Bruk programmet
        </Link>
        <Link to="/verktoy" className="flex items-center gap-3 text-gray-700 hover:text-purple-600">
          <Puzzle size={20} /> Verktøy
        </Link>
        <Link to="/avslore" className="flex items-center gap-3 text-gray-700 hover:text-purple-600">
          <Settings size={20} /> Avslør falske nyheter
        </Link>
        <Link to="/om" className="flex items-center gap-3 text-gray-700 hover:text-purple-600">
          <Info size={20} /> Om Medietilsynet
        </Link>
        <Link to="/kontakt" className="flex items-center gap-3 text-gray-700 hover:text-purple-600">
          <Mail size={20} /> Kontakt oss
        </Link>
        <Link to="/logout" className="flex items-center gap-3 text-gray-700 hover:text-purple-600">
          <LogOut size={20} /> Logg ut
        </Link>
      </nav>

      <div className="mt-10 border-t pt-6">
        <Link to="/profil" className="flex items-center gap-3 text-gray-700 hover:text-purple-600">
          <User size={20} /> Min profil
        </Link>
      </div>
    </aside>
  );
}
