import express, { Request, Response } from "express";
import { users } from "../controllers/user-controller";
import checkUserValidate from "../middleware/middleware";

const router = express.Router();
// get all users route - /api/users
router.get("/users", checkUserValidate, users);

export default router;
