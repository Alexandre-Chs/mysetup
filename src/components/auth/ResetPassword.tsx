"use client";

import { resetPassword } from "@/actions/auth/resetPassword";
import Link from "next/link";
import React from "react";

const ResetPassword = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    await resetPassword(email);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-y-3">
        <input
          name="email"
          id="email"
          placeholder="Email"
          className="placeholder:text-textColor w-full rounded-[8px] bg-[#141516] px-4 py-3 text-sm text-textColor border-1 border-[#393b3e]/25 hover:border-[#4F5051] focus:border-[#6f7073] focus:outline-none transition-colors"
        />
        <button
          type="submit"
          className="w-full text-black bg-[#D0D1D1] relative px-4 py-2 rounded-[8px] flex items-center justify-center group"
        >
          <p>Continue</p>
          <div className="absolute -top-[7px] -left-[27px] w-[350px] h-[55px] group-hover:bg-white/20 blur-xl transition-colors rounded-xl "></div>
        </button>
      </form>
      <Link
        href="/login"
        className="text-textColor text-sm w-full flex items-center justify-center group hover:text-white transition-colors mt-6"
      >
        Back to login
      </Link>
    </div>
  );
};

export default ResetPassword;
