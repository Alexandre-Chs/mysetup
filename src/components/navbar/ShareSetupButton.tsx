"use client";

import { createSetup } from "@/actions/setup/create";
import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { User } from "@/types/types";
import { MoveRight, Loader2 } from "lucide-react";

const ShareSetupButton = ({
  user,
  setIsMenuOpen,
}: {
  user: User;
  setIsMenuOpen: (value: boolean) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleShareSetup = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      await createSetup();
      toast.success("Setup created successfully");
      setIsMenuOpen(false);
    } catch (error) {
      toast.error("Failed to create setup");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center gap-4">
        <Button
          onClick={handleShareSetup}
          disabled={isLoading}
          className="relative w-full text-black bg-textColorLighter px-4 py-2 rounded-[8px] flex items-center justify-center group gap-x-2 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <div>Share your setup</div>
          )}
          {!isLoading && (
            <MoveRight
              size={15}
              className="group-hover:translate-x-1 transition-transform"
            />
          )}
          <div className="absolute w-[170px] h-[60px] -top-[10px] left-0 group-hover:bg-white/15 blur-2xl transition-colors rounded-xl"></div>
        </Button>
      </div>
    </>
  );
};

export default ShareSetupButton;
