import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./firebaseConfig.js";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [melding, setMelding] = useState("");

  const sendResetLink = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setMelding("Tilbakestillingslenke sendt til e-posten.");
    } catch (error) {
      setMelding("Feil: " + error.message);
    }
  };

  return (
    <div>
      <h2>Glemt passord?</h2>
      <input
        type="email"
        placeholder="E-post"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={sendResetLink}>Send lenke</button>
      <p>{melding}</p>
    </div>
  );
}

export default ForgotPassword;
