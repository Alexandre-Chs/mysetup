// EditContext.tsx
import React, { createContext, useState, useContext } from "react";

type EditContextType = {
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
};

export const EditContext = createContext<EditContextType | undefined>(
  undefined
);

export const useEdit = () => {
  const context = useContext(EditContext);

  if (context === undefined) {
    throw new Error("useEdit must be used within an EditProvider");
  }
  return context;
};
