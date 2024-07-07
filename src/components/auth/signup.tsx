"use client";

import React, { useState } from "react";
import { signup } from "@/actions/auth/signup";
import { toast } from "sonner";
import { validSchemaAuthWithEmail } from "@/zod/auth/schema-auth";
import { Button } from "@nextui-org/react";

const SignUp = () => {
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
      const errorMessages = parseDataWithZod.error.errors
        .map((error) => error.message)
        .join(", ");
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
    <div className="h-auto rounded-xl flex flex-col items-center justify-center max-w-lg w-full py-8 bg-white px-8">
      <h1 className="text-xl font-bold">Create an account</h1>
      <p className="text-sm text-gray-400 pb-4">
        Let&apos;s create your account and start sharing your setup
      </p>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex flex-col w-full">
          <label htmlFor="username" className="text-gray-400">
            Username
          </label>
          <input
            name="username"
            id="username"
            className="border-1 border-gray-400 rounded-md p-2"
          />
        </div>
        <br />
        <div className="flex flex-col">
          <label htmlFor="password" className="text-gray-400">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="border-1 border-gray-400 rounded-md p-2"
          />
        </div>
        <br />
        <div className="flex flex-col">
          <label htmlFor="email" className="text-gray-400">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="border-1 border-gray-400 rounded-md p-2"
          />
        </div>
        <br />
        {errorMessage && (
          <p className="text-red-500 font-bold">{errorMessage}</p>
        )}
        <Button
          type="submit"
          className="w-full text-white bg-green-500 font-semibold"
        >
          Continue
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
