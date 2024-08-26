"use client";

import { createSetup } from "@/actions/setup/create";
import React from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { User } from "@/types/types";
import { MoveRight } from "lucide-react";

const ShareSetupButton = ({ user }: { user: User }) => {
  const handleShareSetup = async () => {
    await createSetup();
    toast.success("Setup created successfully");
  };

  //TODO : mettre un loader pour eviter le spam clique
  return (
    <>
      <div className="flex items-center justify-center gap-4">
        <Button
          onClick={handleShareSetup}
          className="relative w-full text-black bg-[#D0D1D1] px-4 py-2 rounded-[8px] flex items-center justify-center group gap-x-2 hover:bg-[#D0D1D1]"
        >
          <div>Share your setup</div>
          <MoveRight
            size={15}
            className="group-hover:translate-x-1 transition-transform"
          />
          <div className="absolute w-[170px] h-[60px] -top-[10px] left-0 group-hover:bg-white/15 blur-2xl transition-colors rounded-xl"></div>
        </Button>
      </div>
    </>
  );
};

export default ShareSetupButton;
