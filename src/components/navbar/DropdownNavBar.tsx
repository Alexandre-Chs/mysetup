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
import { User } from "lucia";
import { ChevronDownIcon, User as UserIcon } from "lucide-react";

const DropdownNavBar = ({ user }: { user: User }) => {
  const [isVerifying, setIsVerifying] = React.useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    await logout();
  };

  const handleProfile = () => {
    router.push(`/${user?.username}`);
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
    <Dropdown className="border-1 border-separator/15">
      <DropdownTrigger>
        <div className="cursor-pointer font-semibold text-white">
          <div className="flex items-center justify-center">
            <ChevronDownIcon size={18} color="#79797A" />
            <UserIcon color="#79797A" size={22} />
          </div>
        </div>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions" variant="solid">
        <DropdownItem key="profile" textValue="Profile" onClick={handleProfile}>
          <p>My profile</p>
        </DropdownItem>
        {/* Va savoir pourquoi cette fourberie marche */}
        {(!user?.emailVerified as unknown as Element) && (
          <DropdownItem
            key="verify"
            textValue="verify my email"
            onClick={handleVerifyEmail}
          >
            <p>{isVerifying ? "Email sent" : "Verify my email"}</p>
          </DropdownItem>
        )}
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
