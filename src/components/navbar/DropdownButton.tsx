import React from "react";
import DropdownNavBar from "./DropdownNavBar";
import { User } from "lucia";

const DropdownButton = ({ user }: { user: User }) => {
  return <DropdownNavBar user={user} />;
};

export default DropdownButton;
