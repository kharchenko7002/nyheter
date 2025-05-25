// src/Login.js
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

function Login() {
  const [email, setEmail] = useState("");
  const [passord, setPassord] = useState("");
  const [melding, setMelding] = useState("");

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
