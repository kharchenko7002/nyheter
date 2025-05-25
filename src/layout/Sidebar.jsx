// src/layout/Sidebar.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  LogOut,
  BookOpen,
  Puzzle,
  Settings,
  Info,
  Mail,
  User
} from "lucide-react";
import auth from "../firebaseConfig";
import { onAuthStateChanged, signOut } from "../firebase-auth";

export default function Sidebar({ onLoginClick, onRegisterClick }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [openProfil, setOpenProfil] = useState(false);
  const [bruker, setBruker] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setBruker(user);
      setAuthChecked(true);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (authChecked && !bruker && location.pathname === "/profil") {
      navigate("/");
    }
  }, [authChecked, bruker, location.pathname, navigate]);

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-64 bg-white shadow-md px-6 py-8 hidden md:block">
      <h2 className="text-2xl font-bold mb-8 text-sky-700">medietilsynet</h2>
      <nav className="space-y-4">
        <Link
          to="/"
          className={`flex items-center gap-3 hover:text-sky-600 ${
            isActive("/") ? "text-sky-600 font-semibold" : "text-gray-700"
          }`}
        >
          <Home size={20} /> Hjem
        </Link>
        <Link
          to="/bruk"
          className={`flex items-center gap-3 hover:text-sky-600 ${
            isActive("/bruk") ? "text-sky-600 font-semibold" : "text-gray-700"
          }`}
        >
          <BookOpen size={20} /> Bruk programmet
        </Link>
        <Link
          to="/verktoy"
          className={`flex items-center gap-3 hover:text-sky-600 ${
            isActive("/verktoy") ? "text-sky-600 font-semibold" : "text-gray-700"
          }`}
        >
          <Puzzle size={20} /> Verktøy
        </Link>
        <Link
          to="/avslore"
          className={`flex items-center gap-3 hover:text-sky-600 ${
            isActive("/avslore") ? "text-sky-600 font-semibold" : "text-gray-700"
          }`}
        >
          <Settings size={20} /> Avslør falske nyheter
        </Link>
        <Link
          to="/om"
          className={`flex items-center gap-3 hover:text-sky-600 ${
            isActive("/om") ? "text-sky-600 font-semibold" : "text-gray-700"
          }`}
        >
          <Info size={20} /> Om Medietilsynet
        </Link>
        <Link
          to="/kontakt"
          className={`flex items-center gap-3 hover:text-sky-600 ${
            isActive("/kontakt") ? "text-sky-600 font-semibold" : "text-gray-700"
          }`}
        >
          <Mail size={20} /> Kontakt oss
        </Link>
        {bruker && (
          <button
            onClick={() => signOut(auth).then(() => navigate("/"))}
            className="flex items-center gap-3 text-gray-700 hover:text-sky-600 w-full text-left"
          >
            <LogOut size={20} /> Logg ut
          </button>
        )}
      </nav>

      <div className="mt-10 border-t pt-6">
        <button
          onClick={() => {
            if (bruker) {
              navigate("/profil");
            } else {
              setOpenProfil((prev) => !prev);
            }
          }}
          className={`w-full flex items-center gap-3 text-left hover:text-sky-600 ${
            isActive("/profil") ? "text-sky-600 font-semibold" : "text-gray-700"
          }`}
        >
          <User size={20} /> Min profil
        </button>

        {openProfil && !bruker && (
          <div className="ml-7 mt-3 p-3 border rounded-xl bg-sky-50 text-sm shadow-sm">
            <p className="text-sky-700 font-medium mb-2">Du er ikke logget inn.</p>
            <button
              onClick={onLoginClick}
              className="w-full text-left text-sky-600 hover:underline mb-1"
            >
              Logg inn
            </button>
            <button
              onClick={onRegisterClick}
              className="w-full text-left text-sky-600 hover:underline"
            >
              Registrer deg
            </button>
          </div>
        )}

        {bruker && (
          <div className="ml-7 mt-2 text-sm text-gray-600">
            <p className="text-sky-800 font-semibold">Velkommen</p>
            <span className="text-sky-700 block truncate">
              {bruker.displayName || bruker.email}
            </span>
          </div>
        )}
      </div>
    </aside>
  );
}
