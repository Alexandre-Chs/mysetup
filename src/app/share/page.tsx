"use client";

import DynamicChoices from "@/components/add-setup/DynamicChoices";
import MainInfos from "@/components/add-setup/MainInfos";
import SelectChoiceSetupAdd from "@/components/add-setup/SelectChoiceSetupAdd";
import WrapperUploadPhotos from "@/components/add-setup/WrapperUploadPhotos";
import UploadPhotos from "@/components/upload/UploadPhoto";
import React from "react";

type TypeChoice = "screen" | "photo" | "description";

type TypeDatas = {
  choice?: TypeChoice;
  type: string;
  position: number;
  datas: any;
};

type TypeInfos = {
  choice: string;
  type: string;
};

const Share = () => {
  const [infos, setInfos] = React.useState<TypeInfos[]>([]);
  const [datas, setDatas] = React.useState<TypeDatas[]>([]);

  const handleInfos = (infos: TypeInfos[]) => {
    setInfos((prev) => [...prev, ...infos]);
  };

  const handleAddDatas = ({ choice, position, datas, type }: TypeDatas) => {
    setDatas((prev) => {
      const updatedDatas = [...prev];
      const index = updatedDatas.findIndex(
        (data) => data.position === position
      );
      if (index !== -1) {
        updatedDatas[index] = { choice, position, datas, type };
      } else {
        updatedDatas.push({ choice, position, datas, type });
      }
      return updatedDatas;
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-12 flex flex-col gap-y-4">
      <WrapperUploadPhotos />
      <MainInfos handleAddDatas={handleAddDatas} />

      <div>
        {infos.map((item, index) => {
          return (
            <DynamicChoices
              choice={item.choice}
              type={item.type}
              handleAddDatas={handleAddDatas}
              key={index}
              position={index + 1}
            />
          );
        })}
      </div>

      <div className="mt-6">
        <SelectChoiceSetupAdd handleInfos={handleInfos} />
      </div>

      {/* TODO: enregister ici */}
    </div>
  );
};

export default Share;
