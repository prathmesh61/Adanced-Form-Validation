// src/index.ts
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRouter from "./router/auth-route";
const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api", authRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port hello ${PORT}`);
});
