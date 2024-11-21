"use client";

import React from "react";
import UpdateName from "./update-setup/UpdateName";
import TogglePublish from "./TogglePublish";
import Signal from "./Signal";

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
          <div className="mb-2 flex flex-row gap-2">
            <TogglePublish />
          </div>
        </div>
      ) : (
        <div className="flex flex-row items-center justify-between pb-2">
          <h1 className="font-bold text-2xl w-full">{setupName}</h1>
          <Signal />
        </div>
      )}
    </div>
  );
};

export default WrapperNameSetup;
