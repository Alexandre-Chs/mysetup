"use client";
import React, { useEffect } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import Carousel from "./Carousel";

const OPTIONS = { loop: true }

export default function ModalCarousel({ photos, selectedId }: { photos: any, selectedId: string | undefined }) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  useEffect(() => {
    if (selectedId !== undefined) {
      onOpen();
    }
  }, [selectedId]);

  return (
    <>
      <Modal size="full" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="bg-transparent border-none shadow-none">
          {(onClose) => (
            <div className="h-full w-full flex items-center justify-center">
              <div className="">
                <Carousel slides={photos} options={OPTIONS} selectedId={selectedId}/>
              </div>
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
