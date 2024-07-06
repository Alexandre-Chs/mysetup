"use client";

import { login } from "@/actions/auth/login";
import { validSchemaAuth } from "@/zod/auth/schema-auth";
import { Button } from "@nextui-org/react";
import React, { useState } from "react";
import { toast } from "sonner";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const parseDataWithZod = validSchemaAuth.safeParse({
      username,
      password,
    });

    console.log(username, password);

    if (!parseDataWithZod.success) {
      const errorMessages = parseDataWithZod.error.errors
        .map((error) => error.message)
        .join(", ");
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
    <div className="h-auto rounded-t-xl flex flex-col items-center justify-center max-w-lg w-full pt-8 bg-white px-8">
      <h1 className="text-xl font-bold">Log in</h1>
      <p className="text-sm text-gray-400 pb-4">
        Let&apos;s log in and start sharing your setup
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

export default Login;
