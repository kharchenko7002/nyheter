// src/pages/Verktoy.jsx
import React, { useState, useEffect } from "react";
import auth from "../firebaseConfig.js";
import {
  onAuthStateChanged,
  signOut,
  sendEmailVerification,
} from "../firebase-auth.js";
import Register from "../Register.js";
import Login from "../Login.js";
import ForgotPassword from "../ForgotPassword.js";
import Profil from "../Profil.js";
import { AnimatePresence, motion } from "framer-motion";
import Header from "../design/Header.jsx";
import Textarea from "../design/Textarea.jsx";
import Buttons from "../design/Buttons.jsx";
import ResultPanel from "../design/ResultPanel.jsx";
import ArticlesList from "../design/ArticlesList.jsx";
import DashboardLayout from "../layout/DashboardLayout.jsx";

export default function Verktoy() {
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
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => setBruker(currentUser));
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

  const loggUt = () => signOut(auth);

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
    } catch {
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
      Array.isArray(data.resultat)
        ? setNyhetsartikler(data.resultat)
        : setResultat(data.resultat);
      const nyTeller = brukteSøk + 1;
      setBrukteSøk(nyTeller);
      localStorage.setItem("søkTeller", nyTeller.toString());
    } catch {
      setResultat("Det oppstod en feil under søk i nyhetskilder.");
    }
    setLaster(false);
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">
        <Header tema="light" toggleTema={() => {}} bruker={bruker} loggUt={loggUt} />
        {visProfil && <Profil />}

        <div className="flex gap-3 mb-6">
          {!bruker && (
            <>
              <button onClick={() => setVisLogin(true)} className="px-4 py-2 rounded bg-white border shadow-sm hover:bg-gray-50">Logg inn</button>
              <button onClick={() => setVisRegister(true)} className="px-4 py-2 rounded bg-white border shadow-sm hover:bg-gray-50">Registrer</button>
              <button onClick={() => setVisGlemtPassord(true)} className="px-4 py-2 rounded bg-white border shadow-sm hover:bg-gray-50">Glemt passord</button>
            </>
          )}
        </div>

        <AnimatePresence>
          {visLogin && !bruker && (
            <motion.div className="bg-white p-6 rounded-xl shadow-lg mb-6 max-w-lg mx-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Login />
            </motion.div>
          )}

          {visRegister && !bruker && (
            <motion.div className="bg-white p-6 rounded-xl shadow-lg mb-6 max-w-lg mx-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Register />
            </motion.div>
          )}

          {visGlemtPassord && !bruker && (
            <motion.div className="bg-white p-6 rounded-xl shadow-lg mb-6 max-w-lg mx-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <ForgotPassword />
            </motion.div>
          )}
        </AnimatePresence>

        {bruker && !bruker.emailVerified && (
          <motion.div
            className="bg-yellow-100 border border-yellow-300 rounded-xl p-4 mb-4 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            ⚠️ Du har ikke bekreftet e-posten din.
            <br />
            <button onClick={sendBekreftelsePåNytt} className="underline text-blue-700 mt-2 block">
              Send e-post på nytt
            </button>
            <p className="text-green-600 mt-1">{sendtPåNytt}</p>
          </motion.div>
        )}

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
          <Buttons sjekkNyhet={sjekkNyhet} soekNewsAPI={soekNewsAPI} laster={laster} bruker={bruker} brukteSøk={brukteSøk} />
        </div>

        <ResultPanel resultat={resultat} />
        <ArticlesList nyhetsartikler={nyhetsartikler} />
      </div>
    </DashboardLayout>
  );
}
