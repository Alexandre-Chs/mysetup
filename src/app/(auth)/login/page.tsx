import Login from "@/components/auth/Login";
import { LoginProvider } from "@/components/auth/LoginProviders";
import React from "react";

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[90vh]">
      <Login />
      <div className="bg-white w-full max-w-lg">
        <div className="h-[1px] max-w-md bg-gray-200 my-8 mx-auto"></div>
      </div>
      <LoginProvider />
    </div>
  );
};

export default Page;
