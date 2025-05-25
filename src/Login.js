// src/Login.js
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { motion } from "framer-motion";
import ForgotPassword from "./ForgotPassword.js";

const auth = getAuth();

export default function Login() {
  const [email, setEmail] = useState("");
  const [passord, setPassord] = useState("");
  const [melding, setMelding] = useState("");
  const [visGlemt, setVisGlemt] = useState(false);

  const loggInn = async () => {
    try {
      const bruker = await signInWithEmailAndPassword(auth, email, passord);
      if (!bruker.user.emailVerified) {
        setMelding("Du må bekrefte e-posten din før du kan logge inn.");
        return;
      }
      setMelding("Innlogging vellykket!");
    } catch (error) {
      setMelding("Feil: " + error.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md p-6 rounded-2xl shadow-xl bg-white border border-sky-200"
    >
      {visGlemt ? (
        <ForgotPassword
          onBackToLogin={() => setVisGlemt(false)}
        />
      ) : (
        <div className="space-y-4">
          <input
            type="email"
            placeholder="E-post"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 bg-white text-sky-900"
          />
          <input
            type="password"
            placeholder="Passord"
            value={passord}
            onChange={(e) => setPassord(e.target.value)}
            className="w-full px-4 py-2 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 bg-white text-sky-900"
          />
          <button
            onClick={loggInn}
            className="w-full py-2 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition shadow-sm"
          >
            Logg inn
          </button>
          <button
            onClick={() => setVisGlemt(true)}
            className="text-sm text-sky-600 hover:underline"
          >
            Glemt passord?
          </button>
          {melding && <p className="text-sm text-red-600 mt-2">{melding}</p>}
        </div>
      )}
    </motion.div>
  );
}