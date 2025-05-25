// src/pages/Hjem.jsx
import React, { useState, useEffect } from "react";
import auth from "../firebaseConfig.js";
import {
  onAuthStateChanged,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "../firebase-auth.js";
import Register from "../Register.js";
import Login from "../Login.js";
import ForgotPassword from "../ForgotPassword.js";
import Profil from "../pages/Profil.jsx";
import Modal from "../components/Modal.jsx";
import Header from "../design/Header.jsx";
import Textarea from "../design/Textarea.jsx";
import Buttons from "../design/Buttons.jsx";
import ResultPanel from "../design/ResultPanel.jsx";
import ArticlesList from "../design/ArticlesList.jsx";
import { UserCircle } from "lucide-react";

export default function Hjem() {
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
  const [tema, setTema] = useState("light");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setBruker);
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
    const lagretTema = localStorage.getItem("tema");
    if (lagretTema) setTema(lagretTema);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", tema === "dark");
    localStorage.setItem("tema", tema);
  }, [tema]);

  const toggleTema = () => setTema(tema === "light" ? "dark" : "light");
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

  const sendResetLink = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error("Feil ved sending:", error.message);
      throw error;
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
    <>
      <Header tema={tema} toggleTema={toggleTema} bruker={bruker} loggUt={loggUt} />

      {bruker && (
        <button
          onClick={() => setVisProfil((prev) => !prev)}
          className="absolute top-[22px] right-[78px] z-50 text-gray-600 dark:text-white hover:text-purple-500"
        >
          <UserCircle size={24} />
        </button>
      )}

      {visProfil && <Profil />}

      <div className="flex gap-3 mb-6">
        {!bruker && (
          <>
            <button onClick={() => setVisLogin(true)} className="px-4 py-2 rounded bg-white border shadow-sm hover:bg-gray-50">
              Logg inn
            </button>
            <button onClick={() => setVisRegister(true)} className="px-4 py-2 rounded bg-white border shadow-sm hover:bg-gray-50">
              Registrer
            </button>
            <button onClick={() => setVisGlemtPassord(true)} className="px-4 py-2 rounded bg-white border shadow-sm hover:bg-gray-50">
              Glemt passord
            </button>
          </>
        )}
      </div>

      <Modal open={visLogin && !bruker} onClose={() => setVisLogin(false)} title="Logg inn">
        <Login />
      </Modal>
      <Modal open={visRegister && !bruker} onClose={() => setVisRegister(false)} title="Registrer">
        <Register />
      </Modal>
      <Modal open={visGlemtPassord && !bruker} onClose={() => setVisGlemtPassord(false)} title="Glemt passord">
        <ForgotPassword onSubmit={sendResetLink} />
      </Modal>

      {bruker && !bruker.emailVerified && (
        <div className="bg-yellow-50 border border-yellow-400 rounded p-4 mb-4 text-sm">
          ⚠️ Du har ikke bekreftet e-posten din.
          <br />
          <button onClick={sendBekreftelsePåNytt} className="underline text-blue-700 mt-2 block">
            Send e-post på nytt
          </button>
          <p className="text-green-600 mt-1">{sendtPåNytt}</p>
        </div>
      )}

      <Textarea tekst={tekst} setTekst={setTekst} />

      <div className="mb-4">
        <label className="text-sm font-medium">
          Språk:
          <select
            value={språk}
            onChange={(e) => setSpråk(e.target.value)}
            className="ml-2 border p-1 rounded"
          >
            <option value="no">Norsk</option>
            <option value="en">Engelsk</option>
          </select>
        </label>
      </div>

      <Buttons sjekkNyhet={sjekkNyhet} soekNewsAPI={soekNewsAPI} laster={laster} bruker={bruker} brukteSøk={brukteSøk} />
      <ResultPanel resultat={resultat} />
      <ArticlesList nyhetsartikler={nyhetsartikler} />
    </>
  );
}
