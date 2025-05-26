// src/pages/StottProsjektet.jsx
import React, { useState } from "react";

export default function StottProsjektet() {
  const [visDetaljer, setVisDetaljer] = useState(false);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-sky-800 mb-4">Støtt prosjektet</h1>
      <p className="text-gray-700 mb-4">
        Dette prosjektet er laget med kjærlighet, svette og litt magi 🧙‍♂️. Det tar tid og ressurser å utvikle, vedlikeholde og holde alt oppe og gå.
      </p>
      <p className="text-gray-700 mb-4">
        Hvis du liker prosjektet og ønsker å bidra, setter jeg utrolig stor pris på det 🙏
      </p>

      <div className="bg-sky-50 border border-sky-200 p-4 rounded mb-4">
        <p className="text-sky-800 font-semibold mb-2">Vipps:</p>

        {!visDetaljer ? (
          <button
            onClick={() => setVisDetaljer(true)}
            className="bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700"
          >
            Vis Vipps-detaljer
          </button>
        ) : (
          <>
            <p className="text-xl font-bold text-sky-900">93 93 43 54</p>
            <p className="text-gray-600 mb-3">Kostiantyn Kharchenko</p>
            <button
              onClick={() => setVisDetaljer(false)}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
            >
              Skjul detaljer
            </button>
          </>
        )}
      </div>

      <p className="text-sm text-gray-500">
        Takk for at du støtter fri tilgang til verktøy for å avsløre falske nyheter! ❤️
      </p>
    </div>
  );
}
