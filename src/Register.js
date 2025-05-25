// src/Register.js
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "./firebase-auth.js";
import auth from "./firebaseConfig.js";


function Register({ onLoginClick }) {
  const [fornavn, setFornavn] = useState("");
  const [etternavn, setEtternavn] = useState("");
  const [email, setEmail] = useState("");
  const [passord, setPassord] = useState("");
  const [melding, setMelding] = useState("");
  const [registrert, setRegistrert] = useState(false);

  const registrer = async () => {
    try {
      const bruker = await createUserWithEmailAndPassword(auth, email, passord);
      await updateProfile(bruker.user, {
        displayName: `${fornavn} ${etternavn}`,
      });
      await sendEmailVerification(bruker.user);
      setRegistrert(true);
      setMelding("");
    } catch (error) {
      setMelding("Feil: " + error.message);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl">
      {registrert ? (
        <div className="bg-sky-50 text-sky-800 p-4 rounded-lg">
          ✅ Vi har sendt deg en bekreftelseslenke til <strong>{email}</strong>.<br />
          Sjekk e-posten din og klikk på lenken for å aktivere kontoen.
        </div>
      ) : (
        <>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Fornavn"
              value={fornavn}
              onChange={(e) => setFornavn(e.target.value)}
              className="w-full px-4 py-2 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
            <input
              type="text"
              placeholder="Etternavn"
              value={etternavn}
              onChange={(e) => setEtternavn(e.target.value)}
              className="w-full px-4 py-2 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
            <input
              type="email"
              placeholder="E-post"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
            <input
              type="password"
              placeholder="Passord"
              value={passord}
              onChange={(e) => setPassord(e.target.value)}
              className="w-full px-4 py-2 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
            <button
              onClick={registrer}
              className="w-full py-2 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition"
            >
              Registrer
            </button>
            {melding && <p className="text-sm text-red-600 mt-2">{melding}</p>}
          </div>
        </>
      )}
    </div>
  );
}

export default Register;