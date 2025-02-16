'use client';

import { UserProvider } from '@/context/UserContext';
import { HeroUIProvider } from '@heroui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { PropsWithChildren } from 'react';

const queryClient = new QueryClient();

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <HeroUIProvider>{children}</HeroUIProvider>
      </UserProvider>
    </QueryClientProvider>
  );
};

export default Providers;
