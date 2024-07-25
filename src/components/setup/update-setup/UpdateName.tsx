"use client";

import { updateSetupName } from "@/actions/setup/update";
import { Input } from "@/components/ui/input";
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
      <Input
        value={name}
        onChange={(e) => handleChangeTextarea(e)}
        placeholder="Enter your setup name"
        className="w-3/4 rounded-md p-2 border-2 border-gray-400"
        max={200}
      />
    </>
  );
};

export default UpdateName;
