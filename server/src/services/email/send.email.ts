import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const ses = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

export const sendEmail = async (
  to: string,
  subject: string,
  htmlBody: string,
  textBody?: string
) => {
  try {
    const params = {
      Destination: {
        ToAddresses: [to],
      },
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: htmlBody,
          },
          Text: {
            Charset: "UTF-8",
            Data: textBody || htmlBody.replace(/<[^>]+>/g, ""), // fallback plain text
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: subject,
        },
      },
      Source: process.env.SES_FROM_EMAIL as string, // must be verified in SES
    };

    const command = new SendEmailCommand(params);
    await ses.send(command);

    console.log(`✅ Email sent to ${to}`);
  } catch (error) {
    console.error("❌ Error sending email:", error);
    throw new Error("Failed to send email");
  }
};
