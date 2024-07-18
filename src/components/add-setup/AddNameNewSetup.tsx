"use client";

import React from "react";
import { Input } from "../ui/input";
import { useCreateSetupStore } from "@/store/CreateSetupStore";

const AddNameNewSetup = () => {
  const [name, setName] = React.useState("");
  const { addNewNameSetup } = useCreateSetupStore();

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    addNewNameSetup({ name: e.target.value });
  };

  return (
    <Input
      placeholder="Enter your setup name"
      className="w-2/4 rounded-md p-2 text-sm"
      onChange={(e) => handleChangeName(e)}
      value={name}
    />
  );
};

export default AddNameNewSetup;
