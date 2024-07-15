"use client";

import { useCreateSetupStore } from "@/store/CreateSetupStore";
import { TypeEquipment } from "@/types/types";
import { validSchemaEquipment } from "@/zod/equipments/schema-equipment";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";

const AddEquipmentModal = ({
  show,
  setShowModal,
}: {
  show: boolean;
  setShowModal: Function;
}) => {
  const [newEquipment, setNewEquipment] = React.useState<TypeEquipment>({
    name: "",
    type: "",
    url: "",
  });
  const [errorMessage, setErrorMessage] = React.useState("");

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { addNewEquipments } = useCreateSetupStore();

  React.useEffect(() => {
    if (show) {
      onOpen();
    }
  }, [show, onOpen, setShowModal]);

  React.useEffect(() => {
    if (!isOpen) {
      setShowModal(false);
    }
  }, [isOpen, setShowModal]);

  const handleSubmit = (onClose: Function) => {
    const result = validSchemaEquipment.safeParse(newEquipment);

    if (!result.success) {
      setErrorMessage(
        result.error.errors.map((error) => error.message).join(", ")
      );
      return;
    }
    addNewEquipments(result.data);
    setShowModal(false);
    setNewEquipment({
      name: "",
      type: "",
      url: "",
    });
    onClose();
    setErrorMessage("");
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Message</ModalHeader>
            <ModalBody>
              <label>Name of the equipment</label>
              <Input
                placeholder="e.g RTX 3060"
                onChange={(e) =>
                  setNewEquipment({
                    ...newEquipment,
                    name: e.currentTarget.value,
                  })
                }
                value={newEquipment.name}
              />
              <label>Type of the equipment</label>
              <Select
                label="Select a type"
                className="w-full"
                onChange={(e: any) => {
                  setNewEquipment({
                    ...newEquipment,
                    type: e.target.value,
                  });
                }}
              >
                <SelectItem value="equipments" key="equipments">
                  Equipment
                </SelectItem>
                <SelectItem value="accessories" key="accessories">
                  Accessories
                </SelectItem>
                <SelectItem value="desk" key="desk">
                  Desk
                </SelectItem>
                <SelectItem value="others" key="others">
                  Other
                </SelectItem>
              </Select>
              <div>
                <label>Where to buy it (optional)</label>
                <p className="text-xs">Affiliate link is authorized</p>
                <Input
                  placeholder="e.g Amazon url"
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
            {errorMessage && (
              <p className="text-red-500 font-bold text-sm px-6">
                {errorMessage}
              </p>
            )}
            <ModalFooter className="justify-end">
              <Button color="secondary" onClick={() => handleSubmit(onClose)}>
                Submit
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
export default AddEquipmentModal;
