import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../firebaseConfig";
import Textarea from "../design/Textarea.jsx";
import Buttons from "../design/Buttons.jsx";
import ResultPanel from "../design/ResultPanel.jsx";
import ArticlesList from "../design/ArticlesList.jsx";

export default function Verktoy() {
  const [tekst, setTekst] = useState("");
  const [resultat, setResultat] = useState("");
  const [nyhetsartikler, setNyhetsartikler] = useState([]);
  const [laster, setLaster] = useState(false);
  const [språk, setSpråk] = useState("no");
  const [bruker, setBruker] = useState(null);
  const [antallIgjen, setAntallIgjen] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("🔐 Firebase-bruker:", user);
      setBruker(user);
    });
    return () => unsubscribe();
  }, []);

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
    } catch {
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
      console.log("📤 sender email:", bruker?.email || null);

      const respons = await fetch("http://localhost:3001/soek-nyhet-newsapi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tekst, språk, email: bruker?.email || null }),
      });

      const data = await respons.json();
      console.log("🔁 status:", respons.status);
      console.log("📥 respons resultat:", data.resultat);

      if (!respons.ok) {
        setResultat(data.resultat);
        if (!bruker && data.resultat.includes("igjen")) {
          const matcher = data.resultat.match(/(\d+)/);
          setAntallIgjen(matcher ? parseInt(matcher[1], 10) : 0);
        }
        setLaster(false);
        return;
      }

      if (Array.isArray(data.resultat)) {
        setNyhetsartikler(data.resultat);
        setAntallIgjen(null);
      } else {
        setResultat(data.resultat);
        if (!bruker && data.resultat.includes("igjen")) {
          const matcher = data.resultat.match(/(\d+)/);
          setAntallIgjen(matcher ? parseInt(matcher[1], 10) : 0);
        }
      }
    } catch {
      setResultat("Det oppstod en feil under søk i nyhetskilder.");
    }

    setLaster(false);
  };

  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="mb-4 text-blue-700 bg-blue-100 border border-blue-300 rounded p-4 text-sm">
        {!bruker && "Gjestemodus aktivert – maks 5 søk"}
        {antallIgjen === 0 && (
          <div className="text-red-600 font-semibold mt-2">
            Du har nådd maksgrensen (5 søk).<br />
            <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded cursor-not-allowed opacity-50" disabled>
              Logg inn for mer
            </button>
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
        <Textarea tekst={tekst} setTekst={setTekst} />
        <div className="mb-4">
          <label className="text-sm font-medium">
            Språk:
            <select
              value={språk}
              onChange={(e) => setSpråk(e.target.value)}
              className="ml-2 border p-2 rounded"
            >
              <option value="no">Norsk</option>
              <option value="en">Engelsk</option>
            </select>
          </label>
        </div>
        <Buttons sjekkNyhet={sjekkNyhet} soekNewsAPI={soekNewsAPI} laster={laster} antallIgjen={antallIgjen} />
      </div>

      <ResultPanel resultat={resultat} />
      <ArticlesList nyhetsartikler={nyhetsartikler} />
    </div>
  );
}
