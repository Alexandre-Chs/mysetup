"use client";

import React from "react";
import Equipment from "./Equipment";
import { EquipmentsTable } from "@/db/schemas";
import NewEquipmentsClient from "./new-setup/NewEquipments.client";
import { useSetupStore } from "@/store/SetupStore";

const WrapperEquipmentSetup = ({
  setupId,
  isOwner,
}: {
  setupId?: string;
  isOwner?: boolean;
}) => {
  const setup = useSetupStore((state) => state.setup);
  const equipments = setup?.equipments as EquipmentsTable[];

  return (
    <>
      {isOwner ? (
        <NewEquipmentsClient
          setupId={setupId as string}
          equipments={equipments}
        />
      ) : (
        <Equipment equipments={equipments ? equipments : []} />
      )}
    </>
  );
};

export default WrapperEquipmentSetup;
