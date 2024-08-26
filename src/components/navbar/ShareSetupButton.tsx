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
  return (
    <>
      <div className="flex items-center justify-center gap-4">
        <Button className="w-full text-black bg-[#D0D1D1] px-4 py-2 rounded-[8px] flex items-center justify-center group gap-x-2 hover:bg-[#D0D1D1]">
          <div onClick={handleShareSetup}>Share your setup</div>
          <MoveRight
            size={15}
            className="group-hover:translate-x-1 transition-transform"
          />
        </Button>
      </div>
    </>
  );
};

export default ShareSetupButton;
