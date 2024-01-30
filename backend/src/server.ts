// src/index.ts
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRouter from "./router/auth-route";
import userRouter from "./router/user-route";
const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api", authRouter);
app.use("/api", userRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port hello ${PORT}`);
});
