import { auth } from "./firebaseConfig.js";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [passord, setPassord] = useState("");
  const [melding, setMelding] = useState("");

  const loggInn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, passord);
      setMelding("Innlogging vellykket!");
    } catch (error) {
      setMelding("Feil: " + error.message);
    }
  };

  return (
    <div>
      <h2>Logg inn</h2>
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
      <button onClick={loggInn}>Logg inn</button>
      <p>{melding}</p>
    </div>
  );
}

export default Login;
