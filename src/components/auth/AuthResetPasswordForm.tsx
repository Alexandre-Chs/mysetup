"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { validPassword } from "@/lib/zod/auth";
import { toast } from "sonner";

export default function AuthResetPasswordForm({ token }: { token: string }) {
  const [password, setPassword] = useState("");
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSendingEmail(true);
    setError("");
    try {
      const parseDataWithZod = validPassword.safeParse({ password });
      if (!parseDataWithZod.success) {
        setError("Password is invalid, must be at least 6 characters long");
        setIsSendingEmail(false);
        return;
      }
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          password: parseDataWithZod.data.password,
        }),
      });
      if (response.ok) {
        router.push("/login?reset=success");
        toast.success("Password reset successfully");
      } else {
        const data = await response.json();
        setError(data.error || "An error occurred");
      }
    } catch (err) {
      setError("An error occurred");
    } finally {
      setIsSendingEmail(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-[18rem] w-full flex items-center justify-center flex-col gap-y-3">
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Nouveau mot de passe"
        required
        className="placeholder:text-textColor w-full rounded-[8px] bg-[#141516] px-4 py-3 text-sm text-textColor border-1 border-[#393b3e]/25 hover:border-[#4F5051] focus:border-[#6f7073] focus:outline-none transition-colors"
        disabled={isSendingEmail}
      />
      <button
        type="submit"
        className="w-full text-black bg-[#D0D1D1] relative px-4 py-2 rounded-[8px] flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isSendingEmail}>
        {isSendingEmail ? "Loading..." : "Reset password"}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
