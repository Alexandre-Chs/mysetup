"use client";

import { useEdit } from "@/context/EditContext";
import { Tooltip } from "@nextui-org/react";
import { Eye, PencilLine } from "lucide-react";
import React from "react";

const ToolbarUpdateSetup = ({ setupId }: { setupId: string }) => {
  const { isEditing, setIsEditing } = useEdit();

  const handleSaveSetup = async () => {
    // await updateSetup(setupId);
    //await createNewSetup(nameNewSetup, newEquipments, description);
  };

  return (
    <div className="w-full flex items-center justify-end max-w-6xl mx-auto gap-4 pr-4">
      {isEditing ? (
        <Tooltip content="View your public setup">
          <Eye className="cursor-pointer" onClick={() => setIsEditing(false)} />
        </Tooltip>
      ) : (
        <Tooltip content="Edit your setup">
          <PencilLine
            className="cursor-pointer"
            onClick={() => setIsEditing(true)}
          />
        </Tooltip>
      )}
    </div>
  );
};

export default ToolbarUpdateSetup;
