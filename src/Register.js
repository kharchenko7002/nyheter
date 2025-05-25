// src/Register.js
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "./firebase-auth.js";
import auth from "./firebaseConfig.js";

function Register() {
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
    <div style={{ padding: "1rem", border: "1px solid #ddd", borderRadius: "8px", marginBottom: "2rem" }}>
      {registrert ? (
        <p style={{ backgroundColor: "#e6f7ff", padding: "1rem", borderRadius: "5px" }}>
          ✅ Vi har sendt deg en bekreftelseslenke til <strong>{email}</strong>.<br />
          Sjekk e-posten din og klikk på lenken for å aktivere kontoen.
        </p>
      ) : (
        <>
          <h2>Registrer deg</h2>
          <input
            type="text"
            placeholder="Fornavn"
            value={fornavn}
            onChange={(e) => setFornavn(e.target.value)}
            style={{ display: "block", marginBottom: "0.5rem", width: "100%" }}
          />
          <input
            type="text"
            placeholder="Etternavn"
            value={etternavn}
            onChange={(e) => setEtternavn(e.target.value)}
            style={{ display: "block", marginBottom: "0.5rem", width: "100%" }}
          />
          <input
            type="email"
            placeholder="E-post"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ display: "block", marginBottom: "0.5rem", width: "100%" }}
          />
          <input
            type="password"
            placeholder="Passord"
            value={passord}
            onChange={(e) => setPassord(e.target.value)}
            style={{ display: "block", marginBottom: "0.5rem", width: "100%" }}
          />
          <button onClick={registrer}>Registrer</button>
          <p>{melding}</p>
        </>
      )}
    </div>
  );
}

export default Register;