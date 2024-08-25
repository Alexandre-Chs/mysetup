import { LoginProvider } from "@/components/auth/LoginProviders";
import SignUp from "@/components/auth/signup";
import React from "react";
import { Divider } from "@nextui-org/divider";
import "@/components/carousel/signup-carousel/embla.css";
import WrapperSignupCarousel from "@/components/carousel/signup-carousel/WrapperSignupCarousel";

const Page = () => {
  return (
    <div className="xl:flex-row flex-col-reverse flex items-center justify-center h-[90vh] px-4 xl:px-0 mt-12 xl:mt-0">
      <div className="flex flex-col items-center justify-center h-[500px] mt-16 xl:mt-0">
        <h2 className="text-xl font-medium text-white pb-6">
          Start sharing your setup
        </h2>
        <WrapperSignupCarousel />
      </div>
      <Divider
        orientation="vertical"
        className="h-[60%] bg-gradient-to-t from-transparent via-separator/50 to-transparent mx-32 hidden xl:block"
      />
      <div className="xl:max-w-[18rem] w-full flex items-center justify-center flex-col">
        <h1 className="text-2xl font-medium text-white pb-6">
          Create your account
        </h1>
        <LoginProvider />
        <p className="text-sm text-textColor pt-4 pb-3">or</p>
        <SignUp />
      </div>
    </div>
  );
};

export default Page;
