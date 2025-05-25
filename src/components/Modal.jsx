// components/Modal.jsx
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Modal({ open, onClose, title, children }) {
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white text-sky-900 p-6 rounded-2xl shadow-2xl max-w-md w-full mx-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="flex justify-between items-center mb-4"
            >
              <h2 className="text-xl font-bold text-sky-800">{title}</h2>
              <button
                onClick={onClose}
                className="text-sky-600 hover:text-sky-800 text-xl"
              >
                &times;
              </button>
            </motion.div>
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              {children}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}