"use client";

import React from "react";
import Description from "./Description";
import UpdateDescription from "./update-setup/UpdateDescription";

const WrapperDescriptionSetup = ({
  description,
  setupId,
  isOwner,
}: {
  description: string;
  setupId: string;
  isOwner: boolean;
}) => {
  return (
    <>
      {isOwner ? (
        <UpdateDescription currentDescription={description} setupId={setupId} />
      ) : (
        <Description description={description} />
      )}
    </>
  );
};

export default WrapperDescriptionSetup;
