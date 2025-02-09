"use client";

import { logout } from "@/app/api/(auth)/signout/actions";
import { Button } from "@nextui-org/react";
import React from "react";

const SignOutMobileButton = () => {
  const handleClick = async () => {
    await logout();
  };

  return (
    <div>
      <p onClick={handleClick} className="text-redText hover:text-redTextLighter cursor-pointer">
        Logout
      </p>
    </div>
  );
};

export default SignOutMobileButton;
