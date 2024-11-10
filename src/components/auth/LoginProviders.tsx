"use client";

import { PiRedditLogoFill } from "react-icons/pi";
import { GrGoogle } from "react-icons/gr";
import { Button } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { loginWithGoogle } from "@/actions/auth/loginWithGoogle";
import { loginWithReddit } from "@/actions/auth/loginWithReddit";

export const LoginProvider = () => {
  const googleMutation = useMutation({
    mutationFn: async () => {
      return await loginWithGoogle();
    },
    onSuccess: () => {
      console.log("success");
    },
    onError: (error) => {
      toast.error(error.message ?? "An error occurred");
    },
  });

  const redditMutation = useMutation({
    mutationFn: async () => {
      return await loginWithReddit();
    },
    onSuccess: () => {
      console.log("success");
    },
    onError: (error) => {
      toast.error(error.message ?? "An error occurred");
    },
  });

  return (
    <div className="flex flex-row items-center w-full justify-center gap-x-2 max-w-lg bg-backgroundPrimary">
      <button
        onClick={() => googleMutation.mutate()}
        className="flex-1 h-[44px] rounded-md border-1 border-[#1F2022] bg-[#141516] hover:bg-[#202123] flex items-center justify-center transition-colors"
      >
        <GrGoogle color="#A1A1A2" size={20} />
      </button>
      {/* <button
        onClick={() => redditMutation.mutate()}
        className="flex-1 h-[44px] rounded-md border-1 border-[#1F2022] bg-[#141516] hover:bg-[#202123] flex items-center justify-center transition-colors"
      >
        <PiRedditLogoFill color="#A1A1A2" size={26} />
      </button> */}
    </div>
  );
};
