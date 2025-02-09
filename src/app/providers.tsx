"use client";

import { EditContext } from "@/context/EditContext";
import { HeroUIProvider } from "@heroui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { PropsWithChildren } from "react";

const queryClient = new QueryClient();

const Providers = ({ children }: PropsWithChildren) => {
  const [isEditing, setIsEditing] = React.useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <HeroUIProvider>
        <EditContext.Provider value={{ isEditing, setIsEditing }}>
          {children}
        </EditContext.Provider>
      </HeroUIProvider>
    </QueryClientProvider>
  );
};

export default Providers;
