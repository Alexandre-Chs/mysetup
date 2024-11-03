"use client";

import React from "react";
import UpdateName from "./update-setup/UpdateName";
import TogglePublish from "./TogglePublish";

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
        <div className="flex flex-row items-center mb-1">
          <UpdateName currentName={setupName} setupId={setupId} />
          <div className="mb-2">
            <TogglePublish />
          </div>
        </div>
      ) : (
        <h1 className="font-bold text-2xl pb-2 w-full">{setupName}</h1>
      )}
    </div>
  );
};

export default WrapperNameSetup;
