"use client";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import React from "react";
import { IoIosAddCircleOutline } from "react-icons/io";

const CHOICES = [
  { key: "titleDescription", label: "Title and description" },
  { key: "photo", label: "Photo" },
  { key: "description", label: "Description" },
];

const SelectChoiceSetupAdd = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <Dropdown>
        <DropdownTrigger>
          <Button className="bg-transparent flex flex-col h-16">
            <IoIosAddCircleOutline size={60} />
            <span className="text-sm">Add a block</span>
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          {CHOICES.map((choice) => (
            <DropdownItem key={choice.key}>{choice.label}</DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default SelectChoiceSetupAdd;
