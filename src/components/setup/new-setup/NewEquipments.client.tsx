"use client";
import React from "react";
import Equipment from "../Equipment";
import ButtonAdd from "@/components/ui/button-add";
import AddEquipmentModal from "@/components/ui/modal/AddEquipmentModal";
import { useCreateSetupStore } from "@/store/CreateSetupStore";

const NewEquipmentsClient = () => {
  const { newEquipments } = useCreateSetupStore();
  const [showModal, setShowModal] = React.useState(false);
  return (
    <>
      <Equipment equipments={newEquipments} action="add" />
      <div className="text-black backdrop-blur-md w-full h-16 flex items-center justify-center border-2 border-gray-200 rounded-xl mt-4">
        <ButtonAdd
          onClickFunction={() => setShowModal(true)}
          text="Add equipment"
        />
      </div>
      <AddEquipmentModal show={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default NewEquipmentsClient;
