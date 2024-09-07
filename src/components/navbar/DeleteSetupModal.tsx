"use client";

import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { deleteSetup } from "@/actions/setup/delete";
import { toast } from "sonner";

export default function DeleteSetupModal({
  show,
  setShowModal,
  setupId,
}: {
  show: boolean;
  setShowModal: (show: boolean) => void;
  setupId: string;
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleClose = () => {
    if (!isDeleting) {
      setShowModal(false);
    }
  };

  const handleAction = async () => {
    setIsDeleting(true);
    try {
      await deleteSetup(setupId);
      toast.success("Setup deleted successfully");
      setShowModal(false);
    } catch (error) {
      toast.error("Failed to delete setup");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Modal isOpen={show} onClose={handleClose} backdrop="blur">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Delete Setup</ModalHeader>
        <ModalBody>
          <p>Are you sure you want to delete this setup?</p>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            variant="light"
            onPress={handleClose}
            disabled={isDeleting}
          >
            Close
          </Button>
          <Button color="primary" onPress={handleAction} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Yes, good bye!"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
