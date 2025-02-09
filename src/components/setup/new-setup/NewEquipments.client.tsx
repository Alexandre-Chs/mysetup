"use client";

import React from "react";
import ButtonAdd from "@/components/ui/button-add";
import AddEquipmentModal from "@/components/ui/modal/AddEquipmentModal";
import { Tooltip } from "@heroui/react";
import { EquipmentType } from "@/types/types";
import Equipment from "../Equipment";
import EquipmentPhotoLinker from "../EquipmentPhotoLinker";

const NewEquipmentsClient = ({
  setupId,
  equipments,
}: {
  setupId?: string;
  equipments?: EquipmentType[] | undefined;
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

        <div className="absolute top-2 right-2 w-auto text-white h-auto flex items-center justify-center rounded-xl">
          <Tooltip content="Link equipment photo">
            <div>
              <EquipmentPhotoLinker />
            </div>
          </Tooltip>
          <Tooltip content="Add equipment">
            <div>
              <ButtonAdd onClickFunction={() => setShowModal(true)} />
            </div>
          </Tooltip>
        </div>
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
