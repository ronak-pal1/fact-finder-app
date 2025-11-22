import {
  Html,
  Body,
  Container,
  Section,
  Text,
  Img,
  Heading,
} from "@react-email/components";

interface OtpEmailProps {
  otp: string;
  description: string;
  email: string;
  name: string;
}

export default function OtpTemplate({
  otp,
  description,
  email,
  name
}: OtpEmailProps) {
  return (
    <Html>
      <Body style={main}>
        <Container style={container}>
          {/* Logo */}
          <Section style={{ textAlign: "center", marginBottom: "20px", padding: "20px", backgroundColor: "#44d54e" }}>
            <Img
              src={"https://aries-assets.s3.ap-south-1.amazonaws.com/app-mark.png"}
              alt={`Aries Logo`}
              width="64"
              height="64"
              style={{ margin: "0 auto" }}
            />
          </Section>

          <Heading as="h1" style={helloHeading}>
            Hello {name} 👋
          </Heading>

          {/* Heading */}
          <Heading as="h2" style={heading}>
            Aries Verification Code
          </Heading>

          <Text style={emailStyle}>{email}</Text>

          {/* Description */}
          <Text style={descriptionStyle}>{description}</Text>

          {/* OTP */}
          <Section style={otpBox}>
            <Text style={otpText}>{otp}</Text>
          </Section>

          {/* Footer */}
          <Text style={footer}>
            If you didn’t request this code, you can safely ignore this email.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

/* Styles */
const main = {
  backgroundColor: "#f6fef9",
  padding: "20px",
  fontFamily: "Arial, sans-serif",
};

const helloHeading = {
  fontSize: "20px",
  color: "#000",
  textAlign: "center" as const,
  margin: "0 0 23px 0",
}

const emailStyle = {
  fontSize: "14px",
  color: "#286ace",
  lineHeight: "1.5",
  marginBottom: "20px",
  textAlign: "center" as const,
}

const container = {
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  padding: "30px",
  maxWidth: "480px",
  margin: "0 auto",
  border: "1px solid #d6f5e3",
};

const heading = {
  color: "#3ec844",
  textAlign: "center" as const,
  margin: "0 0 16px 0",
};

const descriptionStyle = {
  fontSize: "14px",
  color: "#333333",
  lineHeight: "1.5",
  marginBottom: "20px",
  textAlign: "center" as const,
};

const otpBox = {
  backgroundColor: "#e8f5e9",
  borderRadius: "6px",
  padding: "16px",
  textAlign: "center" as const,
  marginBottom: "20px",
};

const otpText = {
  fontSize: "28px",
  fontWeight: "bold",
  color: "#44d54e",
  letterSpacing: "4px",
  margin: "0",
};

const footer = {
  fontSize: "12px",
  color: "#777777",
  textAlign: "center" as const,
};
