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
import Link from "next/link";

export default function ShowClickedImage({
  url,
  setClickedImageUrl,
}: {
  url: string;
  setClickedImageUrl: Function;
}) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  React.useEffect(() => {
    if (url) {
      onOpen();
    }
  }, [url, onOpen]);

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
                  src={url}
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
