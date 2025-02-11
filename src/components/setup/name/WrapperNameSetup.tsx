"use client";

import React from "react";
import SetupUpdateName from "../edit-setup/SetupUpdateName";
import TogglePublish from "../publish/SetupTogglePublish";
import SetupReport from "../report/SetupReport";

const WrapperNameSetup = ({ setupName, setupId, isOwner }: { setupName: string; setupId: string; isOwner: boolean }) => {
  return (
    <div className="w-full">
      {isOwner ? (
        <div className="flex flex-row items-center mb-1">
          <SetupUpdateName currentName={setupName} setupId={setupId} />
          <div className="mb-2 flex flex-row gap-2">
            <TogglePublish />
          </div>
        </div>
      ) : (
        <div className="flex flex-row items-center justify-between pb-2">
          <h1 className="font-bold text-2xl w-full">{setupName}</h1>
          <SetupReport />
        </div>
      )}
    </div>
  );
};

export default WrapperNameSetup;
