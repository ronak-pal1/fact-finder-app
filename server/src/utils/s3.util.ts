import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { config } from "../env.config";
import { v4 as uuidv4 } from "uuid";

const s3Client = new S3Client({
  region: config.aws.REGION,
  credentials: {
    accessKeyId: config.aws.ACCESS_KEY_ID as string,
    secretAccessKey: config.aws.SECRET_ACCESS_KEY as string,
  },
});

export const uploadToS3 = async (
  file: Express.Multer.File,
  folder: string,
): Promise<string> => {
  const fileExtension = file.originalname.split(".").pop();
  const fileName = `${folder}/${uuidv4()}.${fileExtension}`;

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: fileName,
    Body: file.buffer,
    ContentType: file.mimetype,
    // ACL: "public-read", // Optional: if bucket is public, or let bucket policy handle it
  };

  try {
    const command = new PutObjectCommand(params);
    await s3Client.send(command);

    // Return Public URL (Constructed manually to avoid calling GetObject or signing every time if bucket is public)
    // If bucket is private, we should use getSignedUrl from @aws-sdk/s3-request-presigner
    // Assumption: Public read bucket for assets
    return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${config.aws.REGION}.amazonaws.com/${fileName}`;
  } catch (error) {
    console.error("S3 Upload Error:", error);
    throw new Error("File upload failed");
  }
};
