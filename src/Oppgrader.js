import { useState } from "react";
import { auth } from "./firebaseConfig.js";

function Oppgrader() {
  const [melding, setMelding] = useState("");

  const startStripe = async () => {
    const bruker = auth.currentUser;
    if (!bruker) {
      setMelding("Du må være logget inn.");
      return;
    }

    const respons = await fetch("http://localhost:3001/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uid: bruker.uid, email: bruker.email }),
    });

    const data = await respons.json();
    window.location.href = data.url;
  };

  return (
    <div style={{ marginTop: "1rem", padding: "1rem", border: "1px solid #ccc", borderRadius: "6px" }}>
      <p>Gratis brukere har 5 søk per dag. Oppgrader for ubegrenset tilgang.</p>
      <button onClick={startStripe}>Betal med Stripe</button>
      <p>{melding}</p>
    </div>
  );
}

export default Oppgrader;
