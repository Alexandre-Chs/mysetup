"use client";

import React from "react";
import UpdateDescription from "../edit-setup/SetupUpdateDescription";
import Description from "../equipment/SetupEquipmentDescription";

const WrapperDescriptionSetup = ({ description, setupId, isOwner }: { description: string; setupId: string; isOwner: boolean }) => {
  return <>{isOwner ? <UpdateDescription currentDescription={description} setupId={setupId} /> : <Description description={description} />}</>;
};

export default WrapperDescriptionSetup;
