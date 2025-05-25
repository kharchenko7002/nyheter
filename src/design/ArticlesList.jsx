// src/design/ArticlesList.jsx
import { motion } from "framer-motion";

export default function ArticlesList({ nyhetsartikler }) {
  if (!nyhetsartikler || nyhetsartikler.length === 0) return null;

  return (
    <motion.div
      className="bg-sky-50 border border-sky-200 p-6 rounded-2xl shadow-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h3 className="text-lg font-semibold text-sky-800 mb-3">
        Relevante artikler:
      </h3>
      <ul className="space-y-3">
        {nyhetsartikler.map((artikkel, index) => (
          <li key={index} className="">
            <a
              href={artikkel.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-700 font-medium hover:underline"
            >
              {artikkel.tittel}
            </a>
            <div className="text-sm text-sky-500">{artikkel.kilde}</div>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
