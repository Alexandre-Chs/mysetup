"use client";
import { getEquipmentsSetup } from "@/actions/setup/get";
import { groupByType } from "@/lib/utils/group-by-type";
import { usePhotoEquipmentStore } from "@/store/PhotoEquipmentStore";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Select, SelectItem, SelectSection } from "@nextui-org/react";
import { createPhotoEquipment } from "@/actions/photo-equipment/create";

function camelCase(str: string) {
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

const PhotoEquipmentCreateModal = () => {
  const { id } = useParams();

  const newTagCoordinates = usePhotoEquipmentStore((state) => state.newTagCoordinates);
  const setNewTagCoordinates = usePhotoEquipmentStore((state) => state.setNewTagCoordinates);
  const selectedPhotoId = usePhotoEquipmentStore((state) => state.selectedPhotoId);
  const setSelectedPhotoId = usePhotoEquipmentStore((state) => state.setSelectedPhotoId);
  const [equipments, setEquipments] = useState<any[]>([]);
  const [selectedEquipmentId, setSelectedEquipmentId] = useState<any | null>(null);

  function onOpenChange() {
    setNewTagCoordinates(null);
    setSelectedPhotoId(null);
  }

  useEffect(() => {
    async function fetchEquipments() {
      const equipments = await getEquipmentsSetup(Array.isArray(id) ? id[0] : id);
      setEquipments(equipments);
    }
    fetchEquipments();
  }, [id])

  const groupedItems = groupByType(equipments);

  const addPhotoEquipment = async (onClose: Function) => {
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
                <Select
                  label="Equipment"
                  placeholder="Select an equipment"
                  className="max-w-xs"
                  selectedKeys={selectedEquipmentId}
                  onSelectionChange={setSelectedEquipmentId}
                >
                  {Object.keys(groupedItems).map((type) => (
                    <SelectSection key={type} title={camelCase(type)}>
                      {groupedItems[type].map((item: any) => (
                        <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>
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

export default PhotoEquipmentCreateModal;