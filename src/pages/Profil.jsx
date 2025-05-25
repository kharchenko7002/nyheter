// src/pages/Profil.jsx
import React from "react";
import auth from "../firebaseConfig.js";
import { signOut } from "../firebase-auth.js";

export default function Profil() {
  const bruker = auth.currentUser;

  if (!bruker) return null;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-purple-100 rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold mb-4 text-purple-800">Min profil</h2>
      <div className="mb-2">
        <p className="text-sm text-gray-600">Navn:</p>
        <p className="font-medium">{bruker.displayName || "(Ukjent navn)"}</p>
      </div>
      <div className="mb-4">
        <p className="text-sm text-gray-600">E-post:</p>
        <p className="font-medium">{bruker.email}</p>
      </div>
      <button
        onClick={() => signOut(auth)}
        className="w-full bg-purple-700 text-white py-2 px-4 rounded-xl hover:bg-purple-800 transition"
      >
        Logg ut
      </button>
    </div>
  );
}
