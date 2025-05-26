// src/pages/Hjem.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Video } from "lucide-react";
import profile from "../assets/kostiantyn.jpg"; 

export default function Hjem() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-sky-800 mb-6">Velkommen til Medietilsynet</h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-sky-700 mb-4">Hvorfor dette prosjektet ble laget</h2>
        <p className="text-gray-700 mb-4">
          Hei! Dette prosjektet ble laget fordi jeg ønsker å hjelpe folk med å tenke kritisk og ikke blindt tro på all informasjon de ser på internett. I dagens verden
          spres feilinformasjon ekstremt raskt – via sosiale medier, nyhetssider, videoer og til og med kommentarer. Mange mennesker har allerede blitt lurt av
          manipulerte bilder, falske nyheter og deepfakes, og dette kan få alvorlige konsekvenser.
        </p>
        <p className="text-gray-700 mb-4">
          Målet med dette prosjektet er å gi deg verktøyene du trenger for å analysere og avsløre falsk informasjon. Vi kombinerer kunstig intelligens med faktasjekking
          og søk i pålitelige nyhetskilder. Dette er ikke bare et verktøy, det er en bevegelse for sannhet!
        </p>
        <p className="text-gray-700">
          Jo flere som lærer å tenke kritisk og sjekke fakta, jo sterkere blir samfunnet vårt 💪. Du er en del av løsningen!
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-sky-700 mb-4">Skaperen av prosjektet</h2>
        <div className="flex items-center gap-6">
          <img src={profile} alt="Kostiantyn Kharchenko" className="w-64 h-64 object-cover rounded-xl shadow" />
          <div>
            <p className="text-xl font-bold text-gray-800">Kostiantyn Kharchenko</p>
            <p className="text-gray-600">Fullstack utvikler, designer, anti-fake aktivist</p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-sky-700 mb-4">Registrer deg for å få mer</h2>
        <p className="text-gray-700 mb-4">
          Ved å registrere deg får du tilgang til alle funksjonene:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>Ubegrenset nyhetssøk (gjester er begrenset til 5 forsøk)</li>
          <li>Lagre dine tidligere søk og analyser</li>
          <li>Få tilgang til eksklusive tips og læringsmateriell</li>
          <li>Bruk vår AI-faktasjekk uten begrensninger</li>
          <li>Delta i tester og quiz om kritisk tenkning</li>
          <li>Få nyhetsvarsler når mistenkelige saker oppdages</li>
          <li>Delta i vårt fellesskap og diskusjonsforum (kommer snart!)</li>
          <li>Tilpass nyhetsfiltrene dine med AI</li>
          <li>Delta i utviklingen – vi lytter til tilbakemeldinger</li>
          <li>Og mange andre hemmelige funksjoner 😉</li>
        </ul>
        <Link to="/profil" className="inline-block bg-sky-600 text-white px-5 py-2 rounded hover:bg-sky-700">
          Registrer deg nå
        </Link>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-sky-700 mb-4">Video 🎥</h2>
        <div className="space-y-4">
          <p className="text-gray-700">
            📺 <a href="https://www.youtube.com/watch?v=MOaPRcWCxw4" className="text-sky-600 underline" target="_blank" rel="noopener noreferrer">
              Hvordan avsløre falske nyheter
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
