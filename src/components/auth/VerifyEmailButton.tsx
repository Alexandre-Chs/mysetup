"use client";

import { SendVerifyEmail } from "@/app/api/(auth)/verification-email/actions";
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
    <Button
      color="primary"
      onClick={handleVerifyEmail}
      disabled={isVerifying}
      className="w-full text-black bg-[#D0D1D1] px-4 py-2 rounded-[8px] flex items-center justify-center group gap-x-2 hover:bg-[#D0D1D1]">
      {isVerifying ? "Email Sent" : "Verify my email"}
    </Button>
  );
};

export default VerifyEmailButton;
