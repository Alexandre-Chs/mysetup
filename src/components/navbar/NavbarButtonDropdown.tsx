import React from "react";
import DropdownNavBar from "./NavbarDropdown";
import { User } from "lucia";

const NavbarButtonDropdown = ({ user }: { user: User }) => {
  return <DropdownNavBar user={user} />;
};

export default NavbarButtonDropdown;
