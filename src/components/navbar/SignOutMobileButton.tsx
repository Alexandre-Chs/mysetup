"use client";

import { logout } from "@/actions/auth/signout";
import { Button } from "@nextui-org/react";
import React from "react";

const SignOutMobileButton = () => {
  const handleClick = async () => {
    await logout();
  };

  return (
    <>
      <p onClick={handleClick}>Logout</p>
    </>
  );
};

export default SignOutMobileButton;
