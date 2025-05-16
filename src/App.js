import { useState } from "react";

function App() {
  const [tekst, setTekst] = useState("");
  const [resultat, setResultat] = useState("");
  const [laster, setLaster] = useState(false);

  const sjekkNyhet = async () => {
    if (!tekst.trim()) return;

    setLaster(true);
    try {
      const respons = await fetch("http://localhost:3001/sjekk-nyhet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tekst }),
      });

      const data = await respons.json();
      setResultat(data.resultat);
    } catch (error) {
      console.error("Feil:", error);
      setResultat("Det oppstod en feil under sjekkingen av nyheten.");
    }
    setLaster(false);
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Nyhetssjekk</h1>
      <textarea
        value={tekst}
        onChange={(e) => setTekst(e.target.value)}
        placeholder="Lim inn nyheten her..."
        rows="10"
        style={{ width: "100%", marginBottom: "1rem" }}
      />
      <button onClick={sjekkNyhet} disabled={laster}>
        {laster ? "Sjekker..." : "Sjekk nyhet"}
      </button>
      {resultat && (
        <div style={{ marginTop: "2rem", fontSize: "1.2rem" }}>
          <strong>Resultat:</strong> {resultat}
        </div>
      )}
    </div>
  );
}

export default App;
