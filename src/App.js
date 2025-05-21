import { useState, useEffect } from "react";
import { auth } from "./firebaseConfig.js";
import {
  onAuthStateChanged,
  signOut,
  sendEmailVerification,
} from "firebase/auth";
import Register from "./Register.js";
import Login from "./Login.js";
import ForgotPassword from "./ForgotPassword.js";
import Profil from "./Profil.js";

function App() {
  const [tekst, setTekst] = useState("");
  const [resultat, setResultat] = useState("");
  const [nyhetsartikler, setNyhetsartikler] = useState([]);
  const [laster, setLaster] = useState(false);
  const [språk, setSpråk] = useState("no");
  const [bruker, setBruker] = useState(null);
  const [visLogin, setVisLogin] = useState(false);
  const [visRegister, setVisRegister] = useState(false);
  const [visGlemtPassord, setVisGlemtPassord] = useState(false);
  const [sendtPåNytt, setSendtPåNytt] = useState("");
  const [visProfil, setVisProfil] = useState(false);
  const [brukteSøk, setBrukteSøk] = useState(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setBruker(currentUser);
    });

    // Last fra localStorage
    const iDag = new Date().toDateString();
    const lagretDato = localStorage.getItem("søkDato");
    const antall = localStorage.getItem("søkTeller");

    if (lagretDato !== iDag) {
      localStorage.setItem("søkDato", iDag);
      localStorage.setItem("søkTeller", "0");
      setBrukteSøk(0);
    } else {
      setBrukteSøk(Number(antall) || 0);
    }

    return () => unsubscribe();
  }, []);

  const loggUt = () => {
    signOut(auth);
  };

  const sendBekreftelsePåNytt = async () => {
    if (bruker && !bruker.emailVerified) {
      try {
        await sendEmailVerification(bruker);
        setSendtPåNytt("Bekreftelses-e-post er sendt på nytt!");
      } catch (err) {
        setSendtPåNytt("Feil ved sending: " + err.message);
      }
    }
  };

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
      setResultat("Det oppstod en feil under sjekkingen av nyheten.");
    }
    setLaster(false);
  };

  const soekNewsAPI = async () => {
    if (!tekst.trim()) return;

    if (brukteSøk >= 5) {
      setResultat("❌ Du har brukt opp dagens 5 gratis søk.");
      return;
    }

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

      const nyTeller = brukteSøk + 1;
      setBrukteSøk(nyTeller);
      localStorage.setItem("søkTeller", nyTeller.toString());
    } catch (error) {
      setResultat("Det oppstod en feil under søk i nyhetskilder.");
    }
    setLaster(false);
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "700px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Nyhetssjekk</h1>
        {bruker && (
          <div>
            <span style={{ marginRight: "1rem", fontWeight: "bold" }}>
              {bruker.displayName || bruker.email}
            </span>
            <button onClick={() => setVisProfil(!visProfil)}>Profil</button>
          </div>
        )}
      </div>

      {visProfil && <Profil />}

      {!bruker && (
        <div style={{ marginBottom: "1rem" }}>
          <button onClick={() => setVisLogin(!visLogin)}>Logg inn</button>
          <button onClick={() => setVisRegister(!visRegister)}>Registrer</button>
          <button onClick={() => setVisGlemtPassord(!visGlemtPassord)}>Glemt passord</button>
        </div>
      )}

      {visLogin && !bruker && <Login />}
      {visRegister && !bruker && <Register />}
      {visGlemtPassord && !bruker && <ForgotPassword />}

      {bruker && !bruker.emailVerified && (
        <div style={{ backgroundColor: "#fff3cd", padding: "1rem", borderRadius: "5px", marginBottom: "1rem" }}>
          ⚠️ Du har ikke bekreftet e-posten din.
          <br />
          <button onClick={sendBekreftelsePåNytt} style={{ marginTop: "0.5rem" }}>
            Send e-post på nytt
          </button>
          <p style={{ fontSize: "0.9rem", color: "green" }}>{sendtPåNytt}</p>
        </div>
      )}

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
        <button
          onClick={soekNewsAPI}
          disabled={laster || !bruker || !bruker.emailVerified}
        >
          {laster ? "Søker..." : `Søk i NewsAPI (${5 - brukteSøk} igjen)`}
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
