import * as React from "react";
import { Html, Button } from "@react-email/components";

export async function VerifyEmailTemplate(email: string, verifyLink: string) {
  return (
    <Html lang="en">
      <p>Hello {email}</p>
      <p>Please verify your email by clicking the button below:</p>
      <button>
        <a href={verifyLink}>Verify Email</a>
      </button>
    </Html>
  );
}

export default VerifyEmailTemplate;
