"use client";
import React from "react";
import { Select, SelectItem } from "@nextui-org/react";

//TODO : export tout les choix ensuite
const CHOICES = [
  {
    key: "screen",
    label: "Screen",
    type: "equipment",
  },
  {
    key: "mouse",
    label: "Mouse",
    type: "equipment",
  },
  {
    key: "keyboard",
    label: "Keyboard",
    type: "equipment",
  },
  {
    key: "desk",
    label: "Desk",
    type: "accesories",
  },
];

const SelectChoiceSetupAdd = ({ handleInfos }: { handleInfos: Function }) => {
  const handleInfo = (e: any) => {
    const choice = e.currentTarget.dataset.key;
    const type = e.currentTarget.dataset.type;
    handleInfos([{ choice, type }]);
  };

  return (
    <div className="flex p-6 bg-white rounded-lg">
      <Select
        label="Select your setup"
        placeholder="Select your setup"
        className="max-w-xs"
      >
        {CHOICES.map((choice) => (
          <SelectItem
            key={choice.key}
            value={choice.label}
            data-type={choice.type}
            onClick={(e) => handleInfo(e)}
          >
            {choice.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};

export default SelectChoiceSetupAdd;
