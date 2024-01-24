import { Request, Response } from "express";
import { prisma } from "../db";

export const users = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    if (!req.user) {
      return res.status(404).json("unauthorized");
    }
    const users = await prisma.user.findMany({});
    // @ts-ignore
    return res.status(200).json({ users, user: req.user });
  } catch (error) {
    console.log(error);
    return res.status(404).json("something went wrong in get all users");
  }
};

export const user = async (req: Request, res: Response) => {
  const email = req.params.email;
  try {
    // @ts-ignore
    if (!req.user) {
      return res.status(404).json("unauthorized");
    } else {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      return res.status(200).json(user);
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json("something went wrong in get user by EMAIL");
  }
};
