import { auth } from "./firebaseConfig.js";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";

function Register() {
  const [email, setEmail] = useState("");
  const [passord, setPassord] = useState("");
  const [melding, setMelding] = useState("");

  const registrer = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, passord);
      setMelding("Bruker registrert!");
    } catch (error) {
      setMelding("Feil: " + error.message);
    }
  };

  return (
    <div>
      <h2>Registrer deg</h2>
      <input
        type="email"
        placeholder="E-post"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Passord"
        value={passord}
        onChange={(e) => setPassord(e.target.value)}
      />
      <button onClick={registrer}>Registrer</button>
      <p>{melding}</p>
    </div>
  );
}

export default Register;
