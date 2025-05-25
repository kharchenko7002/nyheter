// src/pages/Verktoy.jsx
import React, { useState } from "react";
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
      const respons = await fetch("http://localhost:3001/soek-nyhet-newsapi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tekst, språk }),
      });
      const data = await respons.json();
      Array.isArray(data.resultat)
        ? setNyhetsartikler(data.resultat)
        : setResultat(data.resultat);
    } catch {
      setResultat("Det oppstod en feil under søk i nyhetskilder.");
    }
    setLaster(false);
  };

  return (
    <div className="max-w-5xl mx-auto py-8">
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
        <Buttons sjekkNyhet={sjekkNyhet} soekNewsAPI={soekNewsAPI} laster={laster} />
      </div>

      <ResultPanel resultat={resultat} />
      <ArticlesList nyhetsartikler={nyhetsartikler} />
    </div>
  );
}
