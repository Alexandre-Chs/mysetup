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

const DropdownNavBar = ({ username }: { username?: string }) => {
  const router = useRouter();

  const handleSignOut = async () => {
    await logout();
  };

  const handleProfile = () => {
    router.push(`/${username}`);
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
