import { DynamoDBClient, ListTablesCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { config } from "../env.config";

// ✅ Configure DynamoDB client
const client = new DynamoDBClient({
  region: config.aws.REGION,
  credentials: {
    accessKeyId: config.aws.ACCESS_KEY_ID as string,
    secretAccessKey: config.aws.SECRET_ACCESS_KEY as string,
  },
});

// ✅ Document client (easier to work with JSON instead of raw DynamoDB types)
export const ddb = DynamoDBDocumentClient.from(client);

// ✅ Optional: simple test function
export const connectDB = async () => {
  try {
    // ping by listing tables
    const command = new ListTablesCommand({});
    await client.send(command);
    console.log("✅ DynamoDB connected");
  } catch (error) {
    console.error("❌ DynamoDB connection failed:", error);
  }
};
