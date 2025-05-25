// src/design/Textarea.jsx
export default function Textarea({ tekst, setTekst }) {
  return (
    <textarea
      value={tekst}
      onChange={(e) => setTekst(e.target.value)}
      placeholder="Lim inn nyheten her..."
      rows="6"
      className="w-full border p-3 rounded mb-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  );
}