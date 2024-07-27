"use client";

import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { deleteSetup } from "@/actions/setup/delete";

export default function DeleteSetupModal({
  show,
  setShowModal,
  setupId,
}: {
  show: boolean;
  setShowModal: Function;
  setupId: string;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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

  const handleAction = async () => {
    await deleteSetup(setupId);
    setShowModal(false);
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Delete Setup
              </ModalHeader>
              <ModalBody>
                <p> Are you sure you want to delete this setup ?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleAction}>
                  Yes, good bye !
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
