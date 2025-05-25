// src/layout/Topbar.jsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  Settings,
  Info,
  Mail,
  BookOpen,
  Puzzle,
  User,
} from "lucide-react";

export default function Topbar() {
  const navLinkClasses = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition hover:bg-purple-100 ${
      isActive ? "bg-purple-100 text-purple-800" : "text-gray-700"
    }`;

  return (
    <aside className="bg-white shadow-md h-full w-64 p-6 space-y-4">
      <h2 className="text-xl font-bold text-purple-700 mb-6">Min Profil</h2>
      <nav className="space-y-2">
        <NavLink to="/" className={navLinkClasses} end>
          <Home size={18} /> Hjem
        </NavLink>
        <NavLink to="/bruk" className={navLinkClasses}>
          <BookOpen size={18} /> Bruk programmet
        </NavLink>
        <NavLink to="/verktoy" className={navLinkClasses}>
          <Puzzle size={18} /> Verktøy
        </NavLink>
        <NavLink to="/avslore" className={navLinkClasses}>
          <Settings size={18} /> Avslør falske nyheter
        </NavLink>
        <NavLink to="/om" className={navLinkClasses}>
          <Info size={18} /> Om Medietilsynet
        </NavLink>
        <NavLink to="/kontakt" className={navLinkClasses}>
          <Mail size={18} /> Kontakt oss
        </NavLink>
        <NavLink to="/profil" className={navLinkClasses}>
          <User size={18} /> Profil
        </NavLink>
      </nav>
    </aside>
  );
}
