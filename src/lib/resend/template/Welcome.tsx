import * as React from "react";
import { Html, Button } from "@react-email/components";

export function WelcomeEmailTemplate({ username }: { username: string }) {
  return (
    <Html lang="en">
      <h1>Hello {username}</h1>
    </Html>
  );
}

export default WelcomeEmailTemplate;
