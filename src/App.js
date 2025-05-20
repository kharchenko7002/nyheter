import { useState } from "react";

function App() {
  const [tekst, setTekst] = useState("");
  const [resultat, setResultat] = useState("");
  const [nyhetsartikler, setNyhetsartikler] = useState([]);
  const [laster, setLaster] = useState(false);
  const [språk, setSpråk] = useState("no");

  const sjekkNyhet = async () => {
    if (!tekst.trim()) return;

    setLaster(true);
    setNyhetsartikler([]);
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

  const soekNewsAPI = async () => {
    if (!tekst.trim()) return;

    setLaster(true);
    setResultat("");
    setNyhetsartikler([]);
    try {
      const respons = await fetch("http://localhost:3001/soek-nyhet-newsapi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tekst, språk }),
      });

      const data = await respons.json();
      if (Array.isArray(data.resultat)) {
        setNyhetsartikler(data.resultat);
      } else {
        setResultat(data.resultat);
      }
    } catch (error) {
      console.error("Feil ved søk:", error);
      setResultat("Det oppstod en feil under søk i nyhetskilder.");
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

      <div style={{ marginBottom: "1rem" }}>
        <label>
          Språk for nyhetssøk:{" "}
          <select value={språk} onChange={(e) => setSpråk(e.target.value)}>
            <option value="no">Norsk</option>
            <option value="en">Engelsk</option>
          </select>
        </label>
      </div>

      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <button onClick={sjekkNyhet} disabled={laster}>
          {laster ? "Sjekker..." : "Sjekk nyhet (AI)"}
        </button>
        <button onClick={soekNewsAPI} disabled={laster}>
          {laster ? "Søker..." : "Søk i NewsAPI"}
        </button>
      </div>

      {resultat && (
        <div style={{ marginTop: "2rem", fontSize: "1.2rem" }}>
          <strong>Resultat:</strong> {resultat}
        </div>
      )}

      {nyhetsartikler.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <strong>Relevante artikler:</strong>
          <ul>
            {nyhetsartikler.map((artikkel, index) => (
              <li key={index} style={{ marginBottom: "1rem" }}>
                <a href={artikkel.url} target="_blank" rel="noopener noreferrer">
                  {artikkel.tittel}
                </a>
                <br />
                <em>{artikkel.kilde}</em>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
