"use client";
import React, { useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import Carousel from "./Carousel";

const OPTIONS = { loop: true }

export default function ModalCarousel({ photos, selectedId }: { photos: any, selectedId: string | undefined }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    if (selectedId) {
      onOpen();
    }
  }, [selectedId]);

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="bg-stone-700 bg-opacity-90 border-none shadow-none w-[90vw] h-[90vh] !max-w-none !m-0">
          {(onClose) => (
            <div className="h-full w-full flex items-center justify-center">
              <Carousel slides={photos} options={OPTIONS} selectedId={selectedId} />
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
