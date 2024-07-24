"use client";

import { useUpdateSetupStore } from "@/store/UpdateSetupStore";
import React from "react";

const UpdateDescription = ({
  currentDescription,
}: {
  currentDescription: string;
}) => {
  const [description, setDescription] = React.useState(currentDescription);

  const { updateDescription } = useUpdateSetupStore();

  const handleChangeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
    let description = e.target.value;
    updateDescription({ description });
    console.log(description);
  };

  return (
    <div className="relative h-full bg-[#151515] text-white px-4 py-8 flex flex-col items-start justify-start rounded-large text-bold text-lg">
      <textarea
        className="w-full h-full rounded-md bg-transparent p-2 text-lg text-white resize-none focus:outline-none focus:border-1 focus:border-white border-1 border-transparent"
        placeholder="Add a description for your setup"
        maxLength={530}
        onChange={(e) => handleChangeTextarea(e)}
        value={description ? description : ""}
      />
    </div>
  );
};

export default UpdateDescription;
