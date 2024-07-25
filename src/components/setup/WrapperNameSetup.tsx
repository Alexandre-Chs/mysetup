"use client";

import { useEdit } from "@/context/EditContext";
import React from "react";
import UpdateName from "./update-setup/UpdateName";

const WrapperNameSetup = ({
  setupName,
  setupId,
}: {
  setupName: string;
  setupId: string;
}) => {
  const { isEditing } = useEdit();
  return (
    <div className="w-full max-w-6xl pl-2">
      {isEditing ? (
        <UpdateName currentName={setupName} setupId={setupId} />
      ) : (
        <h1 className="font-bold text-2xl pb-4 uppercase">{setupName}</h1>
      )}
    </div>
  );
};

export default WrapperNameSetup;
