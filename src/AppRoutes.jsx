// src/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import Hjem from "./pages/Hjem.jsx";
import BrukProgrammet from "./pages/BrukProgrammet.jsx";
import Verktoy from "./pages/Verktoy.jsx";
import HvordanAvsloreFalskeNyheter from "./pages/HvordanAvsloreFalskeNyheter.jsx";
import OmMedietilsynet from "./pages/OmMedietilsynet.jsx";
import KontaktOss from "./pages/KontaktOss.jsx";
import Profil from "./pages/Profil.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Hjem />} />
      <Route path="/bruk" element={<BrukProgrammet />} />
      <Route path="/verktoy" element={<Verktoy />} />
      <Route path="/avslore" element={<HvordanAvsloreFalskeNyheter />} />
      <Route path="/om" element={<OmMedietilsynet />} />
      <Route path="/kontakt" element={<KontaktOss />} />
      <Route path="/profil" element={<Profil />} />
    </Routes>
  );
}