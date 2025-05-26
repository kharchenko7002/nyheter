// src/pages/HvordanAvsloreFalskeNyheter.jsx
export default function HvordanAvsloreFalskeNyheter() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-sky-700">Hvordan avsløre falske nyheter?</h1>

      <img src="https://www.medietilsynet.no/globalassets/bilder/illustrasjonsbilder/mediekompetanse/ti-tips-mot-falske-nyheter-400x592.jpg" alt="Plakat: Ti tips mot falske nyheter" className="w-full max-w-xs mx-auto mb-6 rounded shadow" />

      <p className="mb-4 text-sky-800">
        I en verden hvor informasjon spres raskere enn noen gang, er det viktig å kunne avsløre falske nyheter. Mange falske historier ser ekte ut ved første
        øyekast, men med riktig kunnskap og verktøy kan du enkelt identifisere dem. Her er noen konkrete tips:
      </p>

      <ul className="list-disc list-inside space-y-4 text-sky-800">
        <li>
          Sjekk kilden – er det en kjent og pålitelig nyhetskilde?
        </li>
        <li>
          Les hele artikkelen – overskrifter kan være misvisende for å få klikk.
        </li>
        <li>
          Finn ut hvem som har skrevet artikkelen – ekte journalister identifiserer seg.
        </li>
        <li>
          Er informasjonen bekreftet av flere uavhengige kilder?
        </li>
        <li>
          Vær skeptisk til overdrevne, sjokkerende eller emosjonelt ladede overskrifter.
        </li>
        <li>
          Bruk bildesøk (Google Images, TinEye) for å sjekke om bildene er brukt i feil kontekst.
        </li>
        <li>
          Se etter dato og oppdateringer – gamle nyheter kan bli presentert som nye.
        </li>
        <li>
          Sjekk URL-en – mange falske nettsteder har adresser som ligner ekte nyhetssider.
        </li>
        <li>
          Bruk verktøy som Faktisk.no, Snopes.com og dette programmet for å dobbeltsjekke.
        </li>
        <li>
          Spør deg selv: Hvem tjener på at jeg tror på dette?
        </li>
      </ul>

      <p className="mt-6 text-sky-800">
        Kritisk tenkning handler ikke om å ikke tro på noe, men å stille de riktige spørsmålene. Ved å ta deg tid til å undersøke og reflektere, bidrar du
        til å redusere spredningen av feilinformasjon.
      </p>

      <p className="mt-4 text-sky-800">
        Takk for at du er med og bygger et mer bevisst og ansvarlig informasjonssamfunn – ett klikk av gangen!
      </p>
    </div>
  );
}
