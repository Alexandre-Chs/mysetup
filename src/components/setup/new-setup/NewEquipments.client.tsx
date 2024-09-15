"use client";

import React from "react";
import ButtonAdd from "@/components/ui/button-add";
import AddEquipmentModal from "@/components/ui/modal/AddEquipmentModal";
import { Tooltip } from "@nextui-org/react";
import { EquipmentType } from "@/types/types";
import Equipment from "../Equipment";

const NewEquipmentsClient = ({
  setupId,
  equipments,
}: {
  setupId: string;
  equipments: EquipmentType[] | undefined;
}) => {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <>
      <div className="relative h-full w-full">
        <Equipment
          equipments={equipments ? equipments : []}
          action="add"
          setupId={setupId}
        />

        <Tooltip content="Add equipment">
          <div className="absolute top-2 right-2 w-auto text-white h-auto flex items-center justify-center rounded-xl">
            <ButtonAdd onClickFunction={() => setShowModal(true)} />
          </div>
        </Tooltip>
      </div>
      <AddEquipmentModal
        show={showModal}
        setShowModal={setShowModal}
        setupId={setupId}
      />
    </>
  );
};

export default NewEquipmentsClient;
