"use client";

import { createSetup } from "@/actions/setup/create";
import React from "react";
import { toast } from "sonner";
import SignOut from "./DropdownNavBar";
import { Button } from "@/components/ui/button";
import { User } from "@/types/types";

const ShareSetupButton = ({ user }: { user: User }) => {
  const handleShareSetup = async () => {
    await createSetup();
    toast.success("Setup created successfully");
  };
  return (
    <>
      <div className="flex items-center justify-center gap-4">
        <SignOut username={user.username as string} />
        <Button>
          <div onClick={handleShareSetup}>Share your setup</div>
        </Button>
      </div>
    </>
  );
};

export default ShareSetupButton;
