// src/design/ArticlesList.jsx
import { motion } from "framer-motion";

export default function ArticlesList({ nyhetsartikler }) {
  if (nyhetsartikler.length === 0) return null;
  return (
    <motion.div
      className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <strong>Relevante artikler:</strong>
      <ul className="mt-2 list-disc pl-5">
        {nyhetsartikler.map((artikkel, index) => (
          <li key={index} className="mb-2">
            <a
              href={artikkel.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {artikkel.tittel}
            </a>
            <div className="text-sm text-gray-500">{artikkel.kilde}</div>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}