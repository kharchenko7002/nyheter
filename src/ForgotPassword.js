// src/ForgotPassword.js
import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { motion } from "framer-motion";

const auth = getAuth();

export default function ForgotPassword({ onBackToLogin }) {
  const [email, setEmail] = useState("");
  const [melding, setMelding] = useState("");

  const sendResetLink = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setMelding("✅ Tilbakestillingslenke sendt til e-posten.");
    } catch (error) {
      setMelding("Feil: " + error.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md p-6 rounded-2xl shadow-xl bg-white border border-sky-200"
    >
      <h2 className="text-2xl font-bold text-sky-800 mb-4">Glemt passord?</h2>
      <div className="space-y-4">
        <input
          type="email"
          placeholder="E-post"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 bg-white text-sky-900"
        />
        <button
          onClick={sendResetLink}
          className="w-full py-2 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition shadow-sm"
        >
          Send lenke
        </button>
        <button
          type="button"
          onClick={() => onBackToLogin && onBackToLogin()}
          className="w-full py-2 bg-sky-100 text-sky-700 font-semibold rounded-lg hover:bg-sky-200 transition shadow-sm"
        >
          Tilbake til innlogging
        </button>
        {melding && <p className="text-sm text-sky-700 mt-2">{melding}</p>}
      </div>
    </motion.div>
  );
}
