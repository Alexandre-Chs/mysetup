"use client";

import { updateSetupDescription } from "@/actions/setup/update";
import { useDebounce } from "@/hook/useDebounce";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";

const UpdateDescription = ({
  currentDescription,
  setupId,
}: {
  currentDescription: string;
  setupId: string;
}) => {
  const [description, setDescription] = React.useState(currentDescription);

  const handleDebounceText = useDebounce((term: string) => {
    updateSetupDescription(setupId, term);
  }, 1000);

  const handleChangeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
    let description = e.target.value;
    handleDebounceText(description);
  };

  return (
    <div className="relative h-full bento-smooth-gradient text-white p-4 flex flex-col items-start justify-start rounded-large text-bold text-lg">
      <textarea
        className="w-full h-full rounded-md bg-transparent scrollbar text-lg text-white resize-none focus:outline-none focus:border-2 focus:border-transparent border-2 border-transparent"
        placeholder="Add a description for your setup"
        maxLength={530}
        onChange={(e) => handleChangeTextarea(e)}
        value={description ? description : ""}
      />
    </div>
  );
};

export default UpdateDescription;
