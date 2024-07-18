"use client";

import { createNewSetup } from "@/actions/setup/create";
import { useCreateSetupStore } from "@/store/CreateSetupStore";
import { Button } from "@nextui-org/react";
import React from "react";

const SaveButton = () => {
  const { saveInfos, newEquipments, description, nameNewSetup } =
    useCreateSetupStore();

  const handleSaveSetup = async () => {
    await createNewSetup(nameNewSetup, newEquipments, description);
  };
  if (!saveInfos) return null;

  return (
    <Button
      onClick={handleSaveSetup}
      className="bg-transparent border-2 border-black text-black"
    >
      Save your setup
    </Button>
  );
};

export default SaveButton;
