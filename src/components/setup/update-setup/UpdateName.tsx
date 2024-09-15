"use client";

import { updateSetupName } from "@/actions/setup/update";
import { useDebounce } from "@/hook/useDebounce";
import React from "react";

const UpdateName = ({
  currentName,
  setupId,
}: {
  currentName: string;
  setupId: string;
}) => {
  const [name, setName] = React.useState(currentName);

  const handleDebounceText = useDebounce((term: string) => {
    updateSetupName(setupId, term);
  }, 1000);

  const handleChangeTextarea = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    handleDebounceText(e.target.value);
  };

  return (
    <>
      <input
        type="text"
        value={name ? name : ""}
        onChange={(e) => handleChangeTextarea(e)}
        placeholder="Enter your setup name"
        className="w-full rounded-md p-2 bg-transparent focus:border-transparent focus:outline-none"
        max={150}
      />
    </>
  );
};

export default UpdateName;
