import { Input } from "@nextui-org/react";
import React from "react";

const DynamicChoices = ({
  choice,
  handleAddDatas,
  position,
  type,
}: {
  choice: string;
  handleAddDatas: Function;
  position: number;
  type: string;
}) => {
  return (
    <div className="bg-white w-full p-6 rounded-lg mb-4">
      <p className="font-bold uppercase pb-4">{choice}</p>
      <Input
        onChange={(e) =>
          handleAddDatas({
            type,
            position,
            datas: e.currentTarget.value,
            choice,
          })
        }
      />
    </div>
  );
};

export default DynamicChoices;
