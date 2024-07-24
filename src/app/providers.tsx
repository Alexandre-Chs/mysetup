"use client";

import { EditContext } from "@/context/EditContext";
import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { PropsWithChildren } from "react";

const queryClient = new QueryClient();

const Providers = ({ children }: PropsWithChildren) => {
  const [isEditing, setIsEditing] = React.useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <EditContext.Provider value={{ isEditing, setIsEditing }}>
          {children}
        </EditContext.Provider>
      </NextUIProvider>
    </QueryClientProvider>
  );
};

export default Providers;
