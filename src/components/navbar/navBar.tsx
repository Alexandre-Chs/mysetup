import React from "react";
import { validateRequest } from "@/lib/auth/validate-request";
import NavbarClient from "./Navbar.client";

const NavBar = async () => {
  const { user } = await validateRequest();

  return <NavbarClient user={user} />;
};

export default NavBar;
