// src/design/ResultPanel.jsx
import { motion } from "framer-motion";

export default function ResultPanel({ resultat }) {
  if (!resultat) return null;
  return (
    <motion.div
className="bg-blue-100 text-blue-900 border border-blue-300 shadow p-4 rounded mb-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <strong>Resultat:</strong>
      <p className="mt-2 whitespace-pre-wrap">{resultat}</p>
    </motion.div>
  );
}