"use client";

import ButtonAdd from "@/components/ui/button-add";
import React, { useRef, useEffect } from "react";

const NewDescription = () => {
  const [addDescription, setAddDescription] = React.useState(false);
  const [description, setDescription] = React.useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleAddDescription = () => {
    setAddDescription((curr) => !curr);
  };

  useEffect(() => {
    if (addDescription && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [addDescription]);

  return (
    <div className="h-full bg-[#151515] text-white px-4 py-8 flex flex-col items-center justify-center rounded-large text-bold text-lg gap-y-6">
      {addDescription ? (
        <textarea
          ref={textareaRef}
          className="w-full h-full rounded-md bg-transparent p-2 text-sm text-white resize-none focus:outline-none focus:border-1 focus:border-white border-1 border-transparent"
          placeholder="Add a description for your setup"
          maxLength={530}
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
      ) : (
        <ButtonAdd
          onClickFunction={handleAddDescription}
          text="Add description"
        />
      )}
    </div>
  );
};

export default NewDescription;
