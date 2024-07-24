"use client";

import React from "react";
import Description from "./Description";
import UpdateDescription from "./update-setup/UpdateDescription";
import { useEdit } from "@/context/EditContext";

const WrapperDescriptionSetup = ({ description }: { description: string }) => {
  const { isEditing } = useEdit();

  return (
    <>
      {isEditing ? (
        <UpdateDescription currentDescription={description} />
      ) : (
        <Description description={description} />
      )}
    </>
  );
};

export default WrapperDescriptionSetup;
