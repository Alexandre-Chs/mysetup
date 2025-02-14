import React from 'react';
import { validateRequest } from '@/lib/auth/validate-request';
import NavbarClient from './Navbar.client';

export const Navbar = async () => {
  const { user } = await validateRequest();

  return <NavbarClient user={user} />;
};
