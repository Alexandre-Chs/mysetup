"use client";

import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { LuPlusCircle } from "react-icons/lu";
import { createSetup } from "@/actions/setup/create";
import { toast } from "sonner";

export default function CreateSetup() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const [name, setName] = React.useState("");

  async function handleCreate(onClose) {
    // Create setup
    try {
      await createSetup(name);
      toast.success("Setup created successfully");
    } catch (error) {
      toast.error("An error occurred while creating the setup");
    }
    onClose();
  }

  return (
    <>
      <Button onPress={onOpen}>Add new setup <LuPlusCircle/></Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">New setup</ModalHeader>
              <ModalBody>
                <input type="text" placeholder="Name" className="border-1 border-gray-400 rounded-md p-2" value={name} onChange={(e) => setName(e.target.value)} />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={() => handleCreate(onClose)}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
