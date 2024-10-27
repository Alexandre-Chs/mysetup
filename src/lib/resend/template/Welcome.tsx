import * as React from "react";
import {
  Html,
  Button,
  Text,
  Section,
  Container,
} from "@react-email/components";

export function WelcomeEmailTemplate({ username }: { username: string }) {
  return (
    <Html lang="en">
      <Section className="bg-white">
        <Container className="mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold mb-4">
            Welcome to MySetup, {username}! 🎉
          </h1>

          <Text className="mb-4">
            Whether you&apos;re looking for workspace inspiration or ready to
            show off your creative corner, you&apos;re in the right place!
            Browse amazing setups from our community and inspire others with
            yours.
          </Text>

          <div className="mb-6">
            <Button
              className="bg-blue-600 text-white px-6 py-3 rounded-lg"
              href="https://mysetup.app"
            >
              Discover Setups
            </Button>
          </div>

          <Text className="text-sm text-gray-600">
            Happy exploring!
            <br />
            The MySetup Team
          </Text>
        </Container>
      </Section>
    </Html>
  );
}

export default WelcomeEmailTemplate;
