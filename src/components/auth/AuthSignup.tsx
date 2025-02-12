"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { validSchemaAuthWithEmail } from "@/zod/auth/schema-auth";
import { Button } from "@heroui/react";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { signup } from "@/app/api/(auth)/signup/actions";

const AuthSignUp = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    const formData = new FormData(event.target as HTMLFormElement);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const email = formData.get("email") as string;
    const parseDataWithZod = validSchemaAuthWithEmail.safeParse({
      username,
      password,
      email,
    });

    if (!parseDataWithZod.success) {
      const errorMessages = parseDataWithZod.error.errors.map((error) => error.message).join(", ");
      setErrorMessage(errorMessages);
      return;
    }

    const result = await signup(formData);
    if (result && result.status === "error") {
      setErrorMessage(result.message);
      return;
    }

    toast.success("Account created successfully");
  };

  return (
    <div className="h-auto rounded-xl flex flex-col items-center justify-center max-w-lg w-full">
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-y-3">
        <div className="flex flex-col">
          <input
            name="username"
            id="username"
            placeholder="Username"
            className="placeholder:text-textColor rounded-[8px] bg-[#141516] px-4 py-3 text-sm text-textColor border-1 border-[#393b3e]/25 hover:border-[#4F5051] focus:border-[#6f7073] focus:outline-none transition-colors"
          />
        </div>
        <div className="flex flex-col">
          <input
            type="email"
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
        <Button type="submit" className="w-full text-black bg-[#D0D1D1] relative px-4 py-2 rounded-[8px] flex items-center justify-center group">
          Continue
        </Button>
        <p className="text-xs text-textColor max-w-52 mx-auto text-center mt-4">
          By continuing you agree to our{" "}
          <Link href="#" className="font-medium text-textColorLighter">
            Terms of Service
          </Link>
        </p>
      </form>

      <Link href="/login" className="text-textColor text-sm w-full flex items-center justify-center group hover:text-white transition-colors">
        <button className="w-full flex items-center justify-center border-1 border-[#202123] px-6 py-3 rounded-[8px] group mt-8">
          I already have an account
          <span className="group-hover:translate-x-1 transition-transform">
            <MoveRight size={15} />
          </span>
        </button>
      </Link>
    </div>
  );
};

export default AuthSignUp;
