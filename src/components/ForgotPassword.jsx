// components/ForgotPassword.jsx
import { useState } from "react";

export default function ForgotPassword({ onSubmit }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    try {
      await onSubmit(email);
      setSent(true);
    } catch {
      setSent(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-white">
          E-post
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Skriv inn e-postadressen din"
          className="mt-1 w-full rounded-md border-gray-300 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-violet-500"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 px-4 rounded-md transition"
      >
        Send lenke
      </button>
      {sent && (
        <p className="text-green-300 text-sm mt-2">Gjenopprettingslenke er sendt til e-post.</p>
      )}
    </form>
  );
}
