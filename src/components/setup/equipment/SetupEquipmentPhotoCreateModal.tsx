"use client";
import { usePhotoEquipmentStore } from "@/store/PhotoEquipmentStore";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react";
import { useState } from "react";
import { Select, SelectItem, SelectSection } from "@heroui/react";
import { useSetupStore } from "@/store/SetupStore";
import { groupSetupItemsByCategory } from "@/lib/setup/group-items-by-category";
import { createPhotoEquipment } from "@/app/api/setups/equipments/media/actions";

function camelCase(str: string) {
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

const SetupEquipmentPhotoCreateModal = () => {
  const newTagCoordinates = usePhotoEquipmentStore((state) => state.newTagCoordinates);
  const setNewTagCoordinates = usePhotoEquipmentStore((state) => state.setNewTagCoordinates);
  const selectedPhotoId = usePhotoEquipmentStore((state) => state.selectedPhotoId);
  const setSelectedPhotoId = usePhotoEquipmentStore((state) => state.setSelectedPhotoId);

  const setup = useSetupStore((state) => state.setup);
  const equipments = setup?.equipments;
  const [selectedEquipmentId, setSelectedEquipmentId] = useState<any | null>(null);

  function onOpenChange() {
    setNewTagCoordinates(null);
    setSelectedPhotoId(null);
  }

  const groupedItems = groupSetupItemsByCategory(equipments);

  const addPhotoEquipment = async (onClose: Function) => {
    if (!selectedEquipmentId) return;
    const equipmentId = selectedEquipmentId!.currentKey;

    await createPhotoEquipment(selectedPhotoId!, equipmentId, newTagCoordinates!.x, newTagCoordinates!.y);
    onClose();
  };

  return (
    <>
      <Modal isOpen={!!newTagCoordinates} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Tag an equipment</ModalHeader>
              <ModalBody>
                <p>Which equipment is present here ?</p>
                <Select label="Equipment" placeholder="Select an equipment" className="max-w-xs" selectedKeys={selectedEquipmentId} onSelectionChange={setSelectedEquipmentId}>
                  {Object.keys(groupedItems).map((type) => (
                    <SelectSection key={type} title={camelCase(type)}>
                      {groupedItems[type].map((item: any) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectSection>
                  ))}
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button disabled={!selectedEquipmentId?.currentKey} color="primary" onPress={() => addPhotoEquipment(onClose)}>
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default SetupEquipmentPhotoCreateModal;
