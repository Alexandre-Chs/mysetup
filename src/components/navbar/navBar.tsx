import React from "react";
import { Button } from "@/components/ui/button";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import Link from "next/link";
import { validateRequest } from "@/lib/auth/validate-request";
import ShareSetupButton from "./ShareSetupButton";
import SignOutMobileButton from "./SignOutMobileButton";
import DropdownButton from "./DropdownButton";
import VerifyEmailButton from "../auth/VerifyEmailButton";
import { Divider } from "@nextui-org/react";

const NavBar = async () => {
  const { user } = await validateRequest();

  return (
    <header className="lg:max-w-[60rem] xl:max-w-[70rem] mx-auto flex h-28 w-full items-center">
      <Sheet>
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
              <Link
                href="/"
                className="text-textColor hover:text-textColorLighter text-lg"
              >
                My setup
              </Link>
            </div>
            {user && user.username && user.email ? (
              <div className="cursor-pointer pt-24 w-full py-2 text-lg font-semibold bg-transparent text-black flex flex-col items-center justify-center h-[44px] gap-y-6">
                <Link
                  href={`/${user?.username}`}
                  className="hover:text-textColorLighter text-textColor"
                >
                  My profile
                </Link>
                {user.emailVerified ? (
                  <ShareSetupButton user={user} />
                ) : (
                  <div>
                    <VerifyEmailButton />
                  </div>
                )}
                <Divider
                  orientation="horizontal"
                  className="h-[1px] bg-gradient-to-t from-transparent via-separator/50 to-transparent mx-32"
                />
                <SignOutMobileButton />
              </div>
            ) : (
              <Link
                className="relative cursor-pointer text-sm text-white font-medium border-transparent bg-transparent px-4 py-2 rounded-xl border-1 group-hover:bg-transparent transition-colors"
                href="/login"
              >
                Log in
              </Link>
            )}
          </div>
        </SheetContent>
      </Sheet>
      <Link className="mr-6 hidden lg:flex" href="/">
        <h1 className="text-2xl font-semibold text-textColorLighter">
          My setup
        </h1>
        <span className="sr-only">My setup</span>
      </Link>
      <nav className="ml-auto hidden lg:flex gap-6">
        {user && user.email && user.username ? (
          <div className="flex items-center justify-center gap-x-6">
            <ShareSetupButton user={user} />
            <DropdownButton user={user} />
          </div>
        ) : (
          <>
            <div className="relative group">
              <div className="absolute -top-[5px] -left-[11px] group-hover:bg-white/25 blur-xl transition-colors rounded-xl h-[32px] w-[72px]"></div>
              <Link
                className="relative cursor-pointer text-sm text-white font-medium border-transparent bg-transparent px-4 py-2 rounded-xl border-1 group-hover:bg-transparent transition-colors"
                href="/login"
              >
                Log in
              </Link>
            </div>
          </>
        )}
      </nav>
    </header>
  );
};

export default NavBar;

function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
