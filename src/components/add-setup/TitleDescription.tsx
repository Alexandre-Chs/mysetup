import { Input, Textarea } from "@nextui-org/react";
import React from "react";

const TitleDescription = () => {
  return (
    <>
      <Input placeholder="New title" className="mt-6" />
      <Textarea placeholder="Description" className="mt-6" />
    </>
  );
};

export default TitleDescription;
