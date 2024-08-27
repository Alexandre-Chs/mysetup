"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ResetPasswordForm({ token }: { token: string }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(token, password);
    try {
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      if (response.ok) {
        router.push("/login?reset=success");
      } else {
        const data = await response.json();
        setError(data.error || "Une erreur est survenue");
      }
    } catch (err) {
      setError("Une erreur est survenue");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Nouveau mot de passe"
        required
      />
      <button type="submit">Réinitialiser le mot de passe</button>
      {error && <p>{error}</p>}
    </form>
  );
}
