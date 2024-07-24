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
import Image from "next/image";

export default function ShowClickedImage({
  id,
  setClickedImageUrl,
}: {
  id: string;
  setClickedImageUrl: Function;
}) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  React.useEffect(() => {
    if (id) {
      onOpen();
    }
  }, [id, onOpen]);

  React.useEffect(() => {
    if (!isOpen) setClickedImageUrl("");
  }, [isOpen, setClickedImageUrl]);

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <Image
                  src={id}
                  alt="clicked image"
                  width={0}
                  height={0}
                  sizes="90wh"
                  style={{ width: "95vw", height: "auto" }}
                  className="my-8 rounded-md object-contain"
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
