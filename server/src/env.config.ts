import dotenv from "dotenv";

if (dotenv.config().error) {
  console.error("Error loading .env file");
  throw new Error("Error loading .env file");
}

export const config = {
  aws: {
    REGION: process.env.AWS_REGION,
    ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME,
  },
  google: {
    CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  },
  resend: {
    API_KEY: process.env.RESEND_API_KEY,
  },
  JWT_SECRET: process.env.JWT_SECRET,
  PORT: process.env.PORT || 8000,
  ENV: process.env.NODE_ENV || "development",
};
