import React, { useEffect, useState } from "react";
import auth from "../firebaseConfig";
import {
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "../firebase-auth";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
  deleteUser,
} from "firebase/auth";

export default function Profil() {
  const [bruker, setBruker] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [fornavn, setFornavn] = useState("");
  const [etternavn, setEtternavn] = useState("");
  const [gammeltPassord, setGammeltPassord] = useState("");
  const [nyttPassord, setNyttPassord] = useState("");
  const [melding, setMelding] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setBruker(user);
      setAuthChecked(true);
      if (user?.displayName) {
        const [f, e] = user.displayName.split(" ");
        setFornavn(f || "");
        setEtternavn(e || "");
      }
    });
    return () => unsubscribe();
  }, []);

  const firebaseFeilmeldinger = (kode) => {
    switch (kode) {
      case "auth/wrong-password": return "Feil passord.";
      case "auth/weak-password": return "Passordet er for svakt.";
      case "auth/invalid-email": return "Ugyldig e-postadresse.";
      case "auth/email-already-in-use": return "E-posten er allerede i bruk.";
      default: return kode;
    }
  };

  const oppdaterNavn = async () => {
    if (!fornavn || !etternavn) return;
    try {
      await updateProfile(bruker, { displayName: `${fornavn} ${etternavn}` });
      setMelding("✅ Navn oppdatert!");
    } catch (err) {
      setMelding("Feil ved oppdatering: " + firebaseFeilmeldinger(err.code));
    }
  };

  const byttPassord = async () => {
    if (!gammeltPassord || !nyttPassord) return;
    try {
      const credential = EmailAuthProvider.credential(bruker.email, gammeltPassord);
      await reauthenticateWithCredential(bruker, credential);
      await updatePassword(bruker, nyttPassord);
      setMelding("✅ Passord endret!");
    } catch (err) {
      setMelding("Feil: " + firebaseFeilmeldinger(err.code));
    }
  };

  const slettKonto = async () => {
    try {
      await deleteUser(bruker);
    } catch (err) {
      setMelding("Feil ved sletting: " + firebaseFeilmeldinger(err.code));
    }
  };

  if (!authChecked) return <p>Laster inn...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-sky-100 rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold mb-4 text-sky-800">Min profil</h2>

      {!bruker ? (
        <p className="text-gray-700">Du er ikke logget inn.</p>
      ) : (
        <>
          <div className="mb-4">
            <label className="block text-sm text-gray-700">Navn:</label>
            <input
              type="text"
              value={fornavn}
              onChange={(e) => setFornavn(e.target.value)}
              className="w-full px-3 py-2 mt-1 rounded-lg border border-sky-300"
              placeholder="Fornavn"
            />
            <input
              type="text"
              value={etternavn}
              onChange={(e) => setEtternavn(e.target.value)}
              className="w-full px-3 py-2 mt-2 rounded-lg border border-sky-300"
              placeholder="Etternavn"
            />
            <button
              onClick={oppdaterNavn}
              className="mt-2 w-full bg-sky-600 text-white py-2 rounded-lg hover:bg-sky-700"
            >
              Oppdater navn
            </button>
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-700">Bytt passord:</label>
            <input
              type="password"
              placeholder="Nåværende passord"
              value={gammeltPassord}
              onChange={(e) => setGammeltPassord(e.target.value)}
              className="w-full px-3 py-2 mt-1 rounded-lg border border-sky-300"
            />
            <input
              type="password"
              placeholder="Nytt passord"
              value={nyttPassord}
              onChange={(e) => setNyttPassord(e.target.value)}
              className="w-full px-3 py-2 mt-2 rounded-lg border border-sky-300"
            />
            <button
              onClick={byttPassord}
              className="mt-2 w-full bg-sky-600 text-white py-2 rounded-lg hover:bg-sky-700"
            >
              Endre passord
            </button>
          </div>

          <div className="mb-4">
            <button
              onClick={slettKonto}
              className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
            >
              Slett konto
            </button>
          </div>

          <button
            onClick={() => signOut(auth)}
            className="w-full bg-sky-700 text-white py-2 px-4 rounded-xl hover:bg-sky-800 transition"
          >
            Logg ut
          </button>

          {melding && <p className="text-sm text-sky-900 mt-4">{melding}</p>}
        </>
      )}
    </div>
  );
}
