"use client";

import React from "react";

import { EquipmentsTable } from "@/db/schemas";
import NewEquipmentsClient from "./SetupNewEquipments.client";
import { useSetupStore } from "@/store/SetupStore";
import SetupEquipment from "./SetupEquipment";

const WrapperEquipmentSetup = ({ setupId, isOwner }: { setupId?: string; isOwner?: boolean }) => {
  const setup = useSetupStore((state) => state.setup);
  const equipments = setup?.equipments as EquipmentsTable[];

  return <>{isOwner ? <NewEquipmentsClient setupId={setupId as string} equipments={equipments} /> : <SetupEquipment equipments={equipments ? equipments : []} />}</>;
};

export default WrapperEquipmentSetup;
