"use client";

import { useEdit } from "@/context/EditContext";
import React from "react";
import UpdateName from "./update-setup/UpdateName";

const WrapperNameSetup = ({
  setupName,
  setupId,
  isOwner,
}: {
  setupName: string;
  setupId: string;
  isOwner: boolean;
}) => {
  return (
    <div className="w-full">
      {isOwner ? (
        <UpdateName currentName={setupName} setupId={setupId} />
      ) : (
        <h1 className="font-bold text-2xl pb-2 w-full">{setupName}</h1>
      )}
    </div>
  );
};

export default WrapperNameSetup;
