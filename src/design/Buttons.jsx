// src/design/Buttons.jsx
export default function Buttons({ sjekkNyhet, soekNewsAPI, laster, bruker, brukteSøk }) {
  return (
    <div className="flex gap-4 mb-4">
      <button
        onClick={sjekkNyhet}
        disabled={laster}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {laster ? "Sjekker..." : "Sjekk nyhet (AI)"}
      </button>
      <button
        onClick={soekNewsAPI}
        disabled={laster || !bruker || !bruker.emailVerified}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
      >
        {laster ? "Søker..." : `Søk i NewsAPI (${5 - brukteSøk} igjen)`}
      </button>
    </div>
  );
}