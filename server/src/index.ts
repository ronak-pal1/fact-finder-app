import express from "express";
import cors from "cors";
import router from "./routes";
import { connectDB } from "./db/connect.db";
import { config } from './env.config';
import asyncHandler from "./utils/asyncHandler";
import { sendOtpEmail } from "./services/email/send.resend";

const app = express();

// Initialize database connection
connectDB();

const PORT = config.PORT;
const HOST = config.ENV === "development" ? "0.0.0.0" : "localhost";

app.use(cors());
app.use(express.json());
app.use("/api/v1", router);


// app.post("/test-email", asyncHandler(async (req, res) => {
//   const result = await sendOtpEmail("ronakpaul882@gmail.com", "123456", "Your OTP for registering to Aries fitness app is 123456");
//   console.log(result.data)
//   console.log(result.error)
//   res.json({ message: "Email sent successfully", result });
// }));



app.get("/test", (req, res) => {
  console.log("called");
  res.json({ 
    message: "Hello World!", 
    environment: config.ENV 
  });
});


app.listen(PORT as number, HOST as string, () => {
  console.log(`Server is running on http://${HOST}:${PORT} in ${config.ENV} mode`);
});
