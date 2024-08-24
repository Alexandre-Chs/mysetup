"use client";

import { SendVerifyEmail } from "@/actions/auth/verifyEmail";
import { Button } from "@nextui-org/react";
import React from "react";

const VerifyEmailButton = () => {
  const [isVerifying, setIsVerifying] = React.useState(false);

  const handleVerifyEmail = async () => {
    try {
      setIsVerifying(true);
      await SendVerifyEmail();
    } catch (e) {
      console.error("Error sending verification email:", e);
      setIsVerifying(false);
    }
  };

  return (
    <Button color="primary" onClick={handleVerifyEmail} disabled={isVerifying}>
      {isVerifying ? "Email Sent" : "Verify My Email"}
    </Button>
  );
};

export default VerifyEmailButton;
