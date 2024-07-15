import { CirclePlusIcon } from "lucide-react";
import React from "react";

const ButtonAdd = ({
  onClickFunction,
  text,
}: {
  onClickFunction: () => void;
  text: string;
}) => {
  return (
    <button className="rounded-md p-2 group" onClick={onClickFunction}>
      <span className="flex items-center justify-center">
        <CirclePlusIcon className="group-hover:scale-125 transition-transform group-hover:rotate-90" />
      </span>
      <p>{text}</p>
    </button>
  );
};

export default ButtonAdd;
