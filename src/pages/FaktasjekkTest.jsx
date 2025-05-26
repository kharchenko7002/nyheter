import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

const spørsmål = [
  {
    tekst: "Hvordan kan du verifisere at en nyhetsartikkel er ekte?",
    alternativer: [
      "Bare sjekk om mange har delt den på sosiale medier.",
      "Les bare overskriften.",
      "Sjekk kilden, datoen og om det finnes flere troverdige kilder."
    ],
    korrektIndex: 2
  },
  {
    tekst: "Hva er et deepfake?",
    alternativer: [
      "En type informasjonskapsel.",
      "En video som bruker kunstig intelligens til å bytte ansikt eller stemme.",
      "Et virus som angriper telefonen din."
    ],
    korrektIndex: 1
  },
  {
    tekst: "Hvordan kjenner du igjen falske nyheter?",
    alternativer: [
      "Sensasjonelle overskrifter og manglende kilder.",
      "Det ser ut som en PDF.",
      "Hvis det inneholder lange tekster."
    ],
    korrektIndex: 0
  },
  {
    tekst: "Hva bør du gjøre før du deler nyheter?",
    alternativer: [
      "Lese hele artikkelen og dobbeltsjekke fakta.",
      "Bare dele det raskt hvis det virker viktig.",
      "Ignorere innholdet og se på kommentarene."
    ],
    korrektIndex: 0
  },
  {
    tekst: "Hva betyr kildekritikk?",
    alternativer: [
      "Å godta alt man leser.",
      "Å vurdere om kilden er troverdig og aktuell.",
      "Å skrive egne nyheter."
    ],
    korrektIndex: 1
  },
  {
    tekst: "Hvordan oppdager du manipulerte bilder?",
    alternativer: [
      "De har alltid vannmerke.",
      "De vises ikke på telefon.",
      "Ved å gjøre omvendt bildesøk og analysere detaljer."
    ],
    korrektIndex: 2
  }
];

export default function FaktasjekkTest() {
  const [bruker, setBruker] = useState(null);
  const [aktuell, setAktuell] = useState(0);
  const [riktige, setRiktige] = useState(0);
  const [ferdig, setFerdig] = useState(false);
  const [valg, setValg] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) navigate("/login");
      setBruker(user);
    });
    return () => unsubscribe();
  }, [navigate]);

  const svar = (index) => {
    const korrekt = index === spørsmål[aktuell].korrektIndex;
    if (korrekt) setRiktige(riktige + 1);
    setValg([...valg, index]);
    if (aktuell + 1 === spørsmål.length) setFerdig(true);
    else setAktuell(aktuell + 1);
  };

  if (!bruker) return null;

  return (
    <div className="max-w-2xl mx-auto p-6">
      {!ferdig && (
        <div className="mb-4 text-sm text-gray-600">
          Spørsmål {aktuell + 1} av {spørsmål.length}
        </div>
      )}

      {ferdig ? (
        <div className="space-y-6">
          <div className="bg-green-100 text-green-800 p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-2">Resultat</h2>
            <p>Du fikk {riktige} av {spørsmål.length} riktige!</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-lg font-semibold mb-4">Gjennomgang av spørsmål:</h3>
            <div className="space-y-4">
              {spørsmål.map((spm, idx) => (
                <div key={idx}>
                  <p className="font-medium mb-1">{idx + 1}. {spm.tekst}</p>
                  {spm.alternativer.map((alt, altIdx) => {
                    const erKorrekt = altIdx === spm.korrektIndex;
                    const erValgt = altIdx === valg[idx];
                    return (
                      <div
                        key={altIdx}
                        className={`px-3 py-2 rounded border
                          ${erKorrekt ? "bg-green-100 border-green-500 text-green-800" : ""}
                          ${erValgt && !erKorrekt ? "bg-red-100 border-red-500 text-red-800" : ""}
                          ${!erKorrekt && !erValgt ? "bg-gray-50 border-gray-300" : ""}
                        `}
                      >
                        {alt}
                        {erValgt && !erKorrekt && <span className="ml-2 italic">(Ditt svar)</span>}
                        {erValgt && erKorrekt && <span className="ml-2 italic">(Riktig svar)</span>}
                        {!erValgt && erKorrekt && <span className="ml-2 italic">(Korrekt svar)</span>}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">{aktuell + 1}. {spørsmål[aktuell].tekst}</h2>
          <div className="space-y-3">
            {spørsmål[aktuell].alternativer.map((tekst, idx) => (
              <button
                key={idx}
                onClick={() => svar(idx)}
                className="block w-full text-left px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded"
              >
                {tekst}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
