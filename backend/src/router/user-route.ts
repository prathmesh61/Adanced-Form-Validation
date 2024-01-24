import express, { Request, Response } from "express";
import { user, users } from "../controllers/user-controller";
import checkUserValidate from "../middleware/middleware";

const router = express.Router();
// get all users route - /api/users
router.get("/users", checkUserValidate, users);
// get  user by email route - /api/user/email
router.get("/user/:email", checkUserValidate, user);

export default router;
