// src/design/ResultPanel.jsx
import { motion } from "framer-motion";

export default function ResultPanel({ resultat }) {
  if (!resultat) return null;
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 shadow p-4 rounded mb-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <strong>Resultat:</strong>
      <p className="mt-2 whitespace-pre-wrap">{resultat}</p>
    </motion.div>
  );
}