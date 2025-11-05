import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/index.js";
import { sql, connectToDB } from "./config/db.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api", router);

const startServer = async () => {
  try {
    await connectToDB();
    app.listen(PORT, () => {
      console.log(`Server is starting on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Fail to start server", error);
  }
};

startServer();
