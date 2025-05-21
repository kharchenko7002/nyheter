import React from "react";
import { auth } from "./firebaseConfig.js";

function Profil() {
  const bruker = auth.currentUser;

  if (!bruker) return <p>Du er ikke logget inn.</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Min profil</h2>
      <p><strong>Navn:</strong> {bruker.displayName || "Ikke angitt"}</p>
      <p><strong>E-post:</strong> {bruker.email}</p>
      <p><strong>Bekreftet:</strong> {bruker.emailVerified ? "✅ Ja" : "❌ Nei"}</p>
    </div>
  );
}

export default Profil;
