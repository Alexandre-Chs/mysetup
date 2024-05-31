"use client";

import React, { useState } from "react";
import { signup } from "@/actions/auth/signup";

const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    const formData = new FormData(event.target as HTMLFormElement);
    const result = await signup(formData);
    if (result && result.status === "error") {
      setErrorMessage(result.message);
      return;
    }
  };

  return (
    <>
      <h1>Create an account</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input name="username" id="username" />
        <br />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <br />
        {errorMessage && (
          <p className="text-red-500 font-bold">{errorMessage}</p>
        )}
        <button type="submit">Continue</button>
      </form>
    </>
  );
};

export default SignUp;
