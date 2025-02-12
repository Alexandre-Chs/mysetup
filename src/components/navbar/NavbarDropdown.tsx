"use client";

import { logout } from "@/app/api/(auth)/signout/actions";
import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { useRouter } from "next/navigation";
import { User } from "lucia";
import { ChevronDownIcon, User as UserIcon } from "lucide-react";
import { SendVerifyEmail } from "@/app/api/(auth)/verification-email/actions";

const NavbarDropdown = ({ user }: { user: User }) => {
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
            <ChevronDownIcon size={18} color="#d7d7d7" />
            <UserIcon color="#d7d7d7" size={22} />
          </div>
        </div>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions" variant="solid">
        <DropdownItem key="profile" textValue="Profile" onClick={handleProfile}>
          <p>My profile</p>
        </DropdownItem>
        {(!user?.emailVerified as unknown as Element) && (
          <DropdownItem key="verify" textValue="verify my email" onClick={handleVerifyEmail}>
            <p>{isVerifying ? "Email sent" : "Verify my email"}</p>
          </DropdownItem>
        )}
        <DropdownItem textValue="discord" key="discord" className="text-purple-500 font-bold" onClick={() => router.push("https://discord.gg/dzWzNBKUf3")}>
          Bug? Join Discord
        </DropdownItem>
        <DropdownItem textValue="Logout" key="logout" className="text-danger" color="danger" onClick={handleSignOut}>
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default NavbarDropdown;
