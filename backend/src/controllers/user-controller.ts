import { Request, Response } from "express";
import { prisma } from "../db";

export const users = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({});
    return res.status(200).json({ users, user: req.user });
  } catch (error) {
    console.log(error);
    return res.status(404).json("something went wrong in get all users");
  }
};
