"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import Link from "next/link";
import ShareSetupButton from "./NavbarButtonShareSetup";
import SignOutMobileButton from "./NavbarButtonSignout";
import DropdownButton from "./NavbarButtonDropdown";
import { Badge, Divider } from "@heroui/react";
import { User } from "lucia";
import clsx from "clsx";
import Image from "next/image";
import { set } from "zod";
import AuthVerifyEmailButton from "../auth/AuthVerifyEmailButton";

const NavbarClient = ({ user }: { user: User | null }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header
        className={clsx(
          "xl:px-64 md:px-32 mx-auto flex h-20 w-full items-center justify-between fixed top-0 left-0 right-0 z-50 transition-colors bg-transparent border-b border-transparent",
          scrollPosition > 10 && "bg-[#07080A] transition-colors backdrop-blur-lg border-separator/25"
        )}>
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button className="lg:hidden ml-8" size="icon" variant="outline">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <Link className="mr-6 hidden lg:flex" href="#"></Link>
            <div className="relative flex-col pb-6 pt-24 gap-y-6 flex items-center justify-center">
              <div className="absolute top-2 left-2">
                <Link href="/" onClick={handleLinkClick}>
                  <Badge content="beta" color="primary">
                    <Image src="/logo.png" className="h-8 w-auto" alt="mysetup logo" width={100} height={100} priority />
                  </Badge>
                  <span className="sr-only">My setup</span>
                </Link>
              </div>
              {user && user.username && user.email ? (
                <div className="cursor-pointer pt-24 w-full py-2 text-lg font-semibold bg-transparent text-black flex flex-col items-center justify-center h-[44px] gap-y-6">
                  <Link href={`/${user?.username}`} className="hover:text-textColorLighter text-textColorLighter" onClick={handleLinkClick}>
                    My profile
                  </Link>
                  <Badge content="soon">
                    <Link href="#" className="hover:text-textColorLighter text-textColorLighter" onClick={handleLinkClick}>
                      Leaderboards
                    </Link>
                  </Badge>
                  {user.emailVerified ? (
                    <ShareSetupButton user={user} setIsMenuOpen={setIsMenuOpen} />
                  ) : (
                    <div>
                      <AuthVerifyEmailButton />
                    </div>
                  )}
                  <Divider orientation="horizontal" className="h-[1px] bg-gradient-to-t from-transparent via-separator/50 to-transparent mx-32" />
                  <SignOutMobileButton />
                </div>
              ) : (
                <>
                  <Badge content="soon">
                    <Link
                      href="#"
                      className="relative cursor-pointer text-sm text-white font-medium border-transparent bg-transparent px-4 py-2 rounded-xl border-1 group-hover:bg-transparent transition-colors"
                      onClick={handleLinkClick}>
                      Leaderboards
                    </Link>
                  </Badge>
                  <Link
                    className="relative cursor-pointer text-sm text-white font-medium border-transparent bg-transparent px-4 py-2 rounded-xl border-1 group-hover:bg-transparent transition-colors"
                    href="/login"
                    onClick={handleLinkClick}>
                    Log in
                  </Link>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
        <Link className="mr-auto hidden lg:flex flex-1" href="/" onClick={handleLinkClick}>
          <Image src="/logo.png" className="h-8 w-auto" alt="mysetup logo" width={100} height={100} priority />
          <Badge content="beta" color="primary">
            <span className="sr-only">My setup</span>
          </Badge>
        </Link>
        <div className="flex-grow flex justify-center items-center flex-1">
          <Badge content="soon" className="hidden lg:flex">
            <Link href="#" className="text-textColorLighter hover:text-white cursor-pointer transition-colors hidden lg:flex" onClick={handleLinkClick}>
              Leaderboards
            </Link>
          </Badge>
        </div>
        <nav className="ml-auto hidden lg:flex items-center justify-end gap-6 flex-1">
          {user && user.email && user.username ? (
            <div className="flex items-center justify-center gap-x-6">
              <ShareSetupButton user={user} setIsMenuOpen={setIsMenuOpen} />
              <DropdownButton user={user} />
            </div>
          ) : (
            <>
              <div className="relative group ml-auto">
                <div className="absolute -top-[5px] -left-[11px] group-hover:bg-white/25 blur-xl transition-colors rounded-xl h-[32px] w-[72px]"></div>
                <Link
                  className="relative cursor-pointer text-sm text-white font-medium border-transparent bg-transparent px-4 py-2 rounded-xl border-1 group-hover:bg-transparent transition-colors"
                  href="/login"
                  onClick={handleLinkClick}>
                  Log in
                </Link>
              </div>
            </>
          )}
        </nav>
      </header>
    </>
  );
};

export default NavbarClient;

function MenuIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
