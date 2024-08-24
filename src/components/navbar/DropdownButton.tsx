import React from "react";
import DropdownNavBar from "./DropdownNavBar";
import { User } from "@/types/types";

const DropdownButton = ({ user }: { user: User }) => {
  return <DropdownNavBar username={user.username as string} />;
};

export default DropdownButton;
