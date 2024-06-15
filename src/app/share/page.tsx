"use client";

import DynamicChoices from "@/components/add-setup/DynamicChoices";
import MainInfos from "@/components/add-setup/MainInfos";
import SelectChoiceSetupAdd from "@/components/add-setup/SelectChoiceSetupAdd";
import UploadMainPhoto from "@/components/upload/upload-main-photo";
import { Input, Textarea } from "@nextui-org/react";
import React from "react";

type TypeChoice = "titleDescription" | "photo" | "description";

const Share = () => {
  const [choices, setChoices] = React.useState<string[]>([]);

  const handleAddChoice = (choice: TypeChoice) => {
    setChoices((prev) => [...prev, choice]);
  };

  return (
    <div className="max-w-2xl mx-auto mt-16 pb-12">
      <UploadMainPhoto />
      <MainInfos />

      {/* map on dynamic choices */}
      <div>
        {choices.map((choice, index) => {
          return <DynamicChoices choice={choice} key={index} />;
        })}
      </div>

      {/* Add what u want to add */}
      <div className="mt-6">
        <SelectChoiceSetupAdd handleAddChoice={handleAddChoice} />
      </div>
    </div>
  );
};

export default Share;
