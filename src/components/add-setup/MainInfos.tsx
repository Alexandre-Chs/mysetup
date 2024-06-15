import { Textarea, Input } from "@nextui-org/react";
import React from "react";

const MainInfos = () => {
  return (
    <div className="mt-6">
      <p className="font-bold text-2xl">Add your main title and description</p>
      <p className="text-sm">
        Please add a title and a short description for your setup. Make sure the
        description is concise and informative.
      </p>
      <Input placeholder="Title of the setup" className="mt-6" />
      <Textarea placeholder="Main description of the setup" className="mt-6" />
    </div>
  );
};

export default MainInfos;
