"use client";

import {
  Html,
  Head,
  Preview,
  Section,
  Row,
  Heading,
  Text,
} from "@react-email/components";

interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function VerificationEmail({
  username,
  otp,
}: VerificationEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Verofication Email</title>
      </Head>
      <Preview>Here&apos;s Your Verification Code {otp}</Preview>
      <Section>
        <Row>
          <Heading>Hello {username}</Heading>
        </Row>
        <Row>
          <Text>
            Thank You for Registering. Please use the following code to verify
          </Text>
        </Row>
        <Row>
          <Text>{otp}</Text>
        </Row>
      </Section>
    </Html>
  );
}
