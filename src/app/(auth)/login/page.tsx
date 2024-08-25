import Login from "@/components/auth/Login";
import { LoginProvider } from "@/components/auth/LoginProviders";
import React from "react";

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[90vh]">
      <div className="max-w-[18rem] w-full flex items-center justify-center flex-col">
        <h1 className="text-2xl font-medium text-white pb-6">
          Log in to My Setup
        </h1>
        <LoginProvider />
        <p className="text-sm text-textColor pt-4 pb-3">or</p>
        <Login />
      </div>
    </div>
  );
};

export default Page;
