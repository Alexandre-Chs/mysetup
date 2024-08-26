import React from "react";
import { Button } from "@/components/ui/button";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import Link from "next/link";
import { validateRequest } from "@/lib/auth/validate-request";
import ShareSetupButton from "./ShareSetupButton";
import SignOutMobileButton from "./SignOutMobileButton";
import DropdownButton from "./DropdownButton";
import VerifyEmailButton from "../auth/VerifyEmailButton";

const NavBar = async () => {
  const { user } = await validateRequest();

  return (
    <header className="max-w-[80rem] mx-auto flex h-28 w-full items-center">
      <Sheet>
        <SheetTrigger asChild>
          <Button className="lg:hidden" size="icon" variant="outline">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <Link className="mr-6 hidden lg:flex" href="#"></Link>
          <div className="flex-col py-6 gap-y-6 flex items-center justify-center">
            {user && user.username && user.email ? (
              <div className="cursor-pointer mt-12 w-full py-2 text-lg font-semibold bg-transparent text-black flex flex-col items-center justify-center h-[44px] gap-y-6">
                <Link href={`/${user?.username}`}>My profile</Link>
                {user.emailVerified ? (
                  <ShareSetupButton user={user} />
                ) : (
                  <div>
                    <VerifyEmailButton />
                  </div>
                )}
                <SignOutMobileButton />
              </div>
            ) : (
              <>
                <Link
                  className="cursor-pointer text-lg text-textColor font-semibold h-[44px]"
                  href="/login"
                >
                  Log in
                </Link>

                <Link
                  className="cursor-pointer w-full flex justify-center items-center py-2 text-lg font-semibold bg-blueHighlight text-white rounded-md h-[44px]"
                  href="/signup"
                >
                  Sign up
                </Link>
              </>
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
            {user.emailVerified && <ShareSetupButton user={user} />}
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
