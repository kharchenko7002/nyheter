// src/pages/HvordanAvsloreFalskeNyheter.jsx
export default function HvordanAvsloreFalskeNyheter() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-sky-700">Hvordan avsløre falske nyheter?</h1>
      <ul className="list-disc list-inside space-y-2 text-sky-800">
        <li>Sjekk kilden – er den troverdig og kjent?</li>
        <li>Er artikkelen skrevet av en ekte journalist med navn?</li>
        <li>Er informasjonen bekreftet av flere kilder?</li>
        <li>Virker overskriften overdreven eller sjokkerende?</li>
        <li>Bruk verktøy som bilde-søk eller faktasjekk-nettsteder.</li>
      </ul>
    </div>
  );
}
