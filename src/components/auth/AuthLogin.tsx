"use client";

import { login } from "@/app/api/(auth)/signin/actions";
import { validSchemaAuth } from "@/lib/zod/auth";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";

const AuthLogin = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const parseDataWithZod = validSchemaAuth.safeParse({
      email,
      password,
    });

    if (!parseDataWithZod.success) {
      const errorMessages = parseDataWithZod.error.errors.map((error) => error.message).join(", ");
      setErrorMessage(errorMessages);
      return;
    }

    const result = await login(formData);
    if (result && result.status === "error") {
      setErrorMessage(result.message);
      return;
    }

    toast.success("Logged in successfully");
  };

  return (
    <div className="h-auto rounded-t-xl flex flex-col items-center justify-center max-w-lg w-full">
      <form onSubmit={handleSubmit} className="w-full gap-y-3 flex flex-col">
        <div className="flex flex-col w-full">
          <input
            name="email"
            id="email"
            placeholder="Email"
            className="placeholder:text-textColor rounded-[8px] bg-[#141516] px-4 py-3 text-sm text-textColor border-1 border-[#393b3e]/25 hover:border-[#4F5051] focus:border-[#6f7073] focus:outline-none transition-colors"
          />
        </div>
        <div className="flex flex-col">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="placeholder:text-textColor rounded-[8px] bg-[#141516] px-4 py-3 text-sm text-textColor border-1 border-[#393b3e]/25 hover:border-[#4F5051] focus:border-[#6f7073] focus:outline-none transition-colors"
          />
        </div>
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
        <button type="submit" className="w-full text-black bg-[#D0D1D1] relative px-4 py-2 rounded-[8px] flex items-center justify-center group">
          <p>Continue</p>
          <div className="absolute -top-[7px] -left-[27px] w-[350px] h-[55px] group-hover:bg-white/20 blur-xl transition-colors rounded-xl "></div>
        </button>
      </form>

      <Link href="/forgot-password" className="text-textColor text-sm w-full flex items-center justify-center group hover:text-white transition-colors mt-6">
        Forgot password ?
      </Link>
      <Link href="/signup" className="text-textColor text-sm w-full flex items-center justify-center group hover:text-white transition-colors mt-2">
        <button className="w-full flex items-center border-1 border-[#202123] px-6 py-3 rounded-[8px] group">
          Don&apos;t have an account? Sign up
          <span className="group-hover:translate-x-1 transition-transform">
            <MoveRight size={15} />
          </span>
        </button>
      </Link>
    </div>
  );
};

export default AuthLogin;
