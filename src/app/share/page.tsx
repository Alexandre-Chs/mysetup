"use client";

import DynamicChoices from "@/components/add-setup/DynamicChoices";
import MainInfos from "@/components/add-setup/MainInfos";
import SelectChoiceSetupAdd from "@/components/add-setup/SelectChoiceSetupAdd";
import UploadMainPhoto from "@/components/upload/upload-main-photo";
import React from "react";

type TypeChoice = "titleDescription" | "photo" | "description";
type TypeDatas = {
  type: TypeChoice;
  position: number;
  datas: any;
};

const Share = () => {
  const [choices, setChoices] = React.useState<string[]>([]);
  const [datas, setDatas] = React.useState<TypeDatas[]>([]);

  const handleAddChoice = (choice: TypeChoice) => {
    setChoices((prev) => [...prev, choice]);
  };

  const handleAddDatas = ({ type, position, datas }: TypeDatas) => {
    setDatas((prev) => {
      const updatedDatas = [...prev];
      const index = updatedDatas.findIndex(
        (data) => data.position === position
      );

      if (index !== -1) {
        updatedDatas[index] = { type, position, datas };
      } else {
        updatedDatas.push({ type, position, datas });
      }
      return updatedDatas;
    });
  };

  console.log(datas);

  return (
    <div className="max-w-2xl mx-auto mt-16 pb-12">
      <UploadMainPhoto />
      <MainInfos handleAddDatas={handleAddDatas} />

      {/* map on dynamic choices */}
      <div>
        {choices.map((choice, index) => {
          console.log(index);
          return (
            <DynamicChoices
              choice={choice}
              handleAddDatas={handleAddDatas}
              key={index}
              position={index + 1}
            />
          );
        })}
      </div>

      {/* Add what u want to add */}
      <div className="mt-6">
        <SelectChoiceSetupAdd handleAddChoice={handleAddChoice} />
      </div>

      {/* TODO: enregister ici */}
    </div>
  );
};

export default Share;
