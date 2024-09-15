"use client";

import React from "react";
import Equipment from "./Equipment";
import { useEdit } from "@/context/EditContext";
import { EquipmentsTable } from "@/db/schemas";
import NewEquipmentsClient from "./new-setup/NewEquipments.client";
import { useSetupStore } from "@/store/SetupStore";

const WrapperEquipmentSetup = ({ setupId }: { setupId: string }) => {
  const { isEditing } = useEdit();

  const setup = useSetupStore((state) => state.setup);
  const equipments = setup?.equipments as EquipmentsTable[];

  return (
    <>
      {isEditing ? (
        <NewEquipmentsClient setupId={setupId} equipments={equipments} />
      ) : (
        <Equipment equipments={equipments ? equipments : []} />
      )}
    </>
  );
};

export default WrapperEquipmentSetup;
