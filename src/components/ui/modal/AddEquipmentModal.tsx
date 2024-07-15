"use client";

import { useCreateSetupStore } from "@/store/CreateSetupStore";
import { TypeEquipment } from "@/types/types";
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
  });

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

  const handleSubmit = () => {
    addNewEquipments(newEquipment);
    setShowModal(false);
    setNewEquipment({
      name: "",
      type: "",
    });
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
                <SelectItem value="equipment" key="equipment">
                  Equipment
                </SelectItem>
                <SelectItem value="accessories" key="accessories">
                  Accessories
                </SelectItem>
                <SelectItem value="desk" key="desk">
                  Desk
                </SelectItem>
                <SelectItem value="other" key="other">
                  Other
                </SelectItem>
              </Select>
            </ModalBody>
            <ModalFooter className="justify-end">
              <Button
                color="secondary"
                onPress={onClose}
                onClick={handleSubmit}
              >
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
