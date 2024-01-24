import express, { Request, Response } from "express";
import { loginUser, registerUser } from "../controllers/auth-controller";

const router = express.Router();

// register route - /api/register
router.post("/register", registerUser);
// login route - /api/login
router.post("/login", loginUser);

export default router;
