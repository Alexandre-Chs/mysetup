"use client";

import { updateSetup } from "@/actions/setup/update";
import { useEdit } from "@/context/EditContext";
import { Tooltip } from "@nextui-org/react";
import { PencilLine, SaveIcon } from "lucide-react";
import React from "react";

const ToolbarUpdateSetup = ({ setupId }: { setupId: string }) => {
  const { isEditing, setIsEditing } = useEdit();

  const handleSaveSetup = async () => {
    // await updateSetup(setupId);
    //await createNewSetup(nameNewSetup, newEquipments, description);
  };

  return (
    <div className="w-full flex items-center justify-end max-w-6xl mx-auto gap-4 pr-4">
      <Tooltip content="Update your setup">
        <PencilLine
          className="cursor-pointer"
          onClick={() => setIsEditing(true)}
        />
      </Tooltip>
      <Tooltip content="Save your setup" onClick={handleSaveSetup}>
        <SaveIcon className="cursor-pointer" />
      </Tooltip>
    </div>
  );
};

export default ToolbarUpdateSetup;
