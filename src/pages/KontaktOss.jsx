// src/pages/KontaktOss.jsx
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../firebaseConfig";

export default function KontaktOss() {
  const [melding, setMelding] = useState("");
  const [status, setStatus] = useState(null);
  const [bruker, setBruker] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setBruker(user);
      setAuthChecked(true);
    });
    return () => unsubscribe();
  }, []);

  const sendInn = async () => {
    if (!melding.trim()) return;
    setStatus("sender");

    try {
      const navn = bruker.displayName || bruker.email;
      const respons = await fetch("https://formspree.io/f/movdonlv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: navn,
          email: bruker.email,
          message: melding
        })
      });

      if (respons.ok) {
        setStatus("suksess");
        setMelding("");
      } else {
        setStatus("feil");
      }
    } catch {
      setStatus("feil");
    }
  };

  if (!authChecked) return null;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-sky-800">Kontakt oss</h2>
      <p className="text-gray-600 mb-6">
        Her kan du sende oss en melding om du har forslag, problemer eller spørsmål.
      </p>

      {!bruker ? (
        <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 p-4 rounded">
          Du må være logget inn for å sende melding.
        </div>
      ) : (
        <>
          <textarea
            className="w-full border border-gray-300 rounded p-3 mb-4"
            rows={6}
            value={melding}
            onChange={(e) => setMelding(e.target.value)}
            placeholder="Skriv meldingen din her..."
          ></textarea>
          <button
            onClick={sendInn}
            className="bg-sky-600 text-white px-6 py-2 rounded hover:bg-sky-700"
            disabled={status === "sender"}
          >
            {status === "sender" ? "Sender..." : "Send melding"}
          </button>
          {status === "suksess" && (
            <p className="mt-3 text-green-600">Meldingen ble sendt!</p>
          )}
          {status === "feil" && (
            <p className="mt-3 text-red-600">Det oppstod en feil. Prøv igjen.</p>
          )}
        </>
      )}
    </div>
  );
}
