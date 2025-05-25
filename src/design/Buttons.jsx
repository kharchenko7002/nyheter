// src/design/Buttons.jsx
export default function Buttons({ sjekkNyhet, soekNewsAPI, laster, antallIgjen }) {
  const erTom = antallIgjen !== null && antallIgjen <= 0;
  const label = antallIgjen !== null ? `Søk i NewsAPI (${antallIgjen} igjen)` : "Søk i NewsAPI";

  return (
    <div className="flex gap-4">
      <button
        onClick={sjekkNyhet}
        disabled={laster}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        Sjekk nyhet (AI)
      </button>
      <button
        onClick={soekNewsAPI}
        disabled={laster || erTom}
        className="bg-green-400 text-white py-2 px-4 rounded hover:bg-green-500 disabled:opacity-50"
      >
        {label}
      </button>
    </div>
  );
}
