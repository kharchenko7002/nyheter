// src/design/Header.jsx
import { ShieldCheck, Moon, Sun } from "lucide-react";
import Topbar from "../layout/Topbar";

export default function Header({ tema, toggleTema, bruker, loggUt, onToggleProfil }) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between border-b pb-4 mb-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="text-blue-600 dark:text-blue-400" size={32} />
          <h1 className="text-3xl font-bold text-blue-800 dark:text-blue-200 tracking-tight">medietilsynet</h1>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={toggleTema} className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
            {tema === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          {bruker && (
            <div className="text-right">
              <p className="font-semibold text-sm">{bruker.displayName || bruker.email}</p>
              <button onClick={loggUt} className="text-red-500 hover:underline text-xs">Logg ut</button>
            </div>
          )}
        </div>
      </div>
      <Topbar bruker={bruker} onToggleProfil={onToggleProfil} />
    </div>
  );
}
