"use client";

import { logout } from "@/actions/auth/signout";
import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { SendVerifyEmail } from "@/actions/auth/verifyEmail";

const DropdownNavBar = ({ username }: { username?: string }) => {
  const [isVerifying, setIsVerifying] = React.useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    await logout();
  };

  const handleProfile = () => {
    router.push(`/${username}`);
  };

  const handleVerifyEmail = async () => {
    try {
      setIsVerifying(true);
      await SendVerifyEmail();
    } catch (e) {
      console.error("Error sending verification email:", e);
      setIsVerifying(false);
    }
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <div className="cursor-pointer font-semibold">{username}</div>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="profile" textValue="Profile" onClick={handleProfile}>
          <p>Profile</p>
        </DropdownItem>
        <DropdownItem
          key="verify"
          textValue="verify my email"
          onClick={handleVerifyEmail}
        >
          <p>{isVerifying ? "Email Sent" : "Verify My Email"}</p>
        </DropdownItem>
        <DropdownItem
          textValue="Logout"
          key="logout"
          className="text-danger"
          color="danger"
          onClick={handleSignOut}
        >
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropdownNavBar;
