"use client";

import { createNewEquipments } from "@/app/api/setups/actions";
import { CATEGORY_ORDER, getItemCategory, SETUP_CATEGORIES } from "@/lib/setup/categories";
import { useCreateSetupStore } from "@/store/CreateSetupStore";
import { TypeEquipment } from "@/types/types";
import { validSchemaEquipment } from "@/lib/zod/equipments";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, SelectSection, useDisclosure } from "@heroui/react";
import { MoveRight } from "lucide-react";
import React from "react";

const ModalAddEquipment = ({ show, setShowModal, setupId }: { show: boolean; setShowModal: Function; setupId?: string }) => {
  const [newEquipment, setNewEquipment] = React.useState<TypeEquipment>({ name: "", type: "", category: "", url: "" });
  const [errorMessage, setErrorMessage] = React.useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { addNewEquipments } = useCreateSetupStore();

  React.useEffect(() => {
    if (!show) return;
    onOpen();
  }, [show, onOpen, setShowModal]);

  React.useEffect(() => {
    if (isOpen) return;
    setShowModal(false);
  }, [isOpen, setShowModal]);

  const handleSubmit = async (onClose: Function) => {
    const result = validSchemaEquipment.safeParse(newEquipment);

    if (!result.success) {
      setErrorMessage(result.error.errors.map((error) => error.message).join(", "));
      return;
    }

    addNewEquipments(result.data);
    setShowModal(false);
    await createNewEquipments(setupId as string, result.data);
    setNewEquipment({ name: "", type: "", category: "", url: "" });
    onClose();
    setErrorMessage("");
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    const category = getItemCategory(selectedValue);
    setNewEquipment({ ...newEquipment, type: selectedValue, category: category });
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur" className="bg-[#07080A]">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-textColorLighter">Add equipment</ModalHeader>
            <ModalBody>
              <div className="flex flex-col">
                <label className="text-textColorLighter pb-1">Name of the equipment</label>
                <input
                  className="placeholder:text-textColor rounded-[8px] bg-[#141516] px-4 py-3 text-sm text-textColorLighter border-1 border-[#393b3e]/25 hover:border-[#4F5051] focus:border-[#6f7073] focus:outline-none transition-colors"
                  onChange={(e) => setNewEquipment({ ...newEquipment, name: e.currentTarget.value })}
                  value={newEquipment.name}
                />
              </div>
              <div className="flex flex-col pt-2">
                <label className="text-textColorLighter pb-1">Type of the equipment</label>
                <Select
                  classNames={{
                    trigger:
                      "bg-[#141516] text-sm placeholder:text-textColor text-textColorLighter border-1 border-[#393b3e]/25 hover:border-[#4F5051] focus:border-[#6f7073] focus:outline-none transition-colors data-[hover=true]:bg-[#141516]",
                  }}
                  label="Select a type"
                  className="w-full"
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleSelectChange(e)}>
                  {CATEGORY_ORDER.map((category) => (
                    <SelectSection key={category} showDivider title={category}>
                      {SETUP_CATEGORIES[category].map((item) => (
                        <SelectItem key={item}>{item}</SelectItem>
                      ))}
                    </SelectSection>
                  ))}
                </Select>
              </div>
              <div className="flex flex-col pt-2">
                {newEquipment.type === "wallpaper" ? (
                  <label className="text-textColorLighter pb-1">Where to download it</label>
                ) : (
                  <label className="text-textColorLighter pb-1">Where to buy it (optional)</label>
                )}
                <input
                  placeholder={newEquipment.type === "wallpaper" ? "e.g URL" : "e.g Amazon url"}
                  className="placeholder:text-textColor rounded-[8px] bg-[#141516] px-4 py-3 text-sm text-textColorLighter border-1 border-[#393b3e]/25 hover:border-[#4F5051] focus:border-[#6f7073] focus:outline-none transition-colors"
                  value={newEquipment.url}
                  onChange={(e) =>
                    setNewEquipment({
                      ...newEquipment,
                      url: e.currentTarget.value,
                    })
                  }
                />
              </div>
            </ModalBody>
            {errorMessage && <p className="text-red-500 font-bold text-sm px-6">{errorMessage}</p>}
            <ModalFooter className="justify-end">
              <div className="text-textColorLighter text-sm w-full flex items-center justify-center group hover:text-white transition-colors mt-2">
                <button color="secondary" onClick={() => handleSubmit(onClose)} className="w-full flex items-center justify-center gap-x-2 border-1 border-[#4F5051] px-6 py-3 rounded-[8px]">
                  Submit
                  <span className="group-hover:translate-x-1 transition-transform">
                    <MoveRight size={15} />
                  </span>
                </button>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
export default ModalAddEquipment;
