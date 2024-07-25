"use client";

import React from "react";
import Equipment from "./Equipment";
import { useEdit } from "@/context/EditContext";
import { EquipmentsTable } from "@/db/schemas";
import NewEquipmentsClient from "./new-setup/NewEquipments.client";

const WrapperEquipmentSetup = ({
  setupId,
  equipments,
}: {
  setupId: string;
  equipments: EquipmentsTable[];
}) => {
  const { isEditing } = useEdit();

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
