/* eslint-disable react/no-unescaped-entities */
"use client";

import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@heroui/react";

import { User } from "lucia";
import { SendVerifyEmail } from "@/app/api/(auth)/verification-email/actions";
import { setFirstVisit } from "@/app/api/users/actions";

export default function WelcomeModal({ user }: { user: User }) {
  const [showModal, setShowModal] = React.useState(true);
  const [isVerifying, setIsVerifying] = React.useState(false);

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const handleVerifyEmail = async () => {
    try {
      setIsVerifying(true);
      await SendVerifyEmail();
    } catch (e) {
      console.error("Error sending verification email:", e);
      setIsVerifying(false);
    }
  };

  const handleUnderstand = async () => {
    try {
      await setFirstVisit();
      setShowModal(false);
    } catch (e) {
      console.error("Error closing modal:", e);
    }
  };

  return (
    <div>
      <Modal isOpen={showModal} onOpenChange={onOpenChange} size="lg" backdrop="blur">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Welcome to My Setup!</ModalHeader>
              <ModalBody>
                <p>Dear {user.username || "user"},</p>
                <p>We&apos;re thrilled to welcome you to My Setup, the ultimate platform for sharing and discovering unique setups!</p>
                <p>To fully enjoy our community and be able to share your own setup, we kindly ask you to verify your email address. Its quick and easy!</p>
                <p>Click the button below to receive a verification email. Remember to check your spam folder if you don&apos;t see it in your inbox.</p>
                <Button color="primary" onPress={handleVerifyEmail} disabled={isVerifying} className="mt-2">
                  {isVerifying ? "Email Sent" : "Verify My Email"}
                </Button>
                {isVerifying && <p className="text-sm text-gray-500 mt-2">A verification email has been sent. Please check your inbox and spam folder.</p>}
                <p className="text-sm text-gray-300 mt-4">
                  Don&apos;t worry if you can&apos;t verify your email right now. You can always do it later by clicking on your username and selecting "Verify My Email" from the dropdown menu.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={handleUnderstand}>
                  I Understand
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
