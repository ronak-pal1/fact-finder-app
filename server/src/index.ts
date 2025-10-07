import express from "express";
import cors from "cors";
import v1Routes from "./routes";
import { config } from "./env.config";

const app = express();
const PORT = config.PORT;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/api/v1", v1Routes);

app.listen(PORT, () => {
  console.log(`The server is listening on port ${PORT}`);
});
