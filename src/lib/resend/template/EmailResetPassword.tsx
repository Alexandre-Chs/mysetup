import * as React from 'react';
import { Html } from '@react-email/components';

export async function EmailResetPassword(email: string, verifyLink: string) {
  return (
    <Html lang="en">
      <p>Hello {email}</p>
      <p>Please reset your password by clicking the button below:</p>
      <p>If you did not request a password reset, please ignore this email.</p>
      <button>
        <a href={verifyLink}>Reset password</a>
      </button>
    </Html>
  );
}

export default EmailResetPassword;
