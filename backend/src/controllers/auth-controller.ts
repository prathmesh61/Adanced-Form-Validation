import { Request, Response } from "express";
import { prisma } from "../db";
import { z } from "zod";
import jwt from "jsonwebtoken";
const userSchema = z.object({
  name: z.string().min(1, "name is required"),
  email: z.string().email(),
  password: z.string().min(5, "password is required"),
});
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5, "password is required"),
});
export const registerUser = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const validation = userSchema.safeParse(body);

    if (!validation.success) {
      return res.json(validation.error.format());
    }
    // check user already register
    const userExist = await prisma.user.findFirst({
      where: {
        email: validation.data.email,
      },
    });
    if (userExist) {
      return res.status(400).json("User already Exist login");
    }

    // register user
    const newUser = await prisma.user.create({
      data: {
        email: validation.data.email,
        name: validation.data.name,
        password: validation.data.password,
      },
    });
    // token created
    const token = jwt.sign({ user: newUser.email }, process.env.JWT_SECRET!, {
      expiresIn: "1hr",
    });

    return res.cookie("access_token", token).status(201).json(newUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json("somthing went wrong in register.");
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const validation = loginSchema.safeParse(body);
    if (!validation.success) {
      return res.json(validation.error.format());
    }
    // check user already register or not registered
    const userExist = await prisma.user.findFirst({
      where: {
        email: validation.data.email,
      },
    });
    if (!userExist) {
      return res.status(400).json("User not register");
    }

    // check password match
    const password = validation.data.password === userExist.password;
    if (!password) {
      return res.status(400).json("User unauthorized check login credentials");
    }
    // token created
    const token = jwt.sign({ user: userExist.email }, process.env.JWT_SECRET!, {
      expiresIn: "1hr",
    });

    return res.cookie("access_token", token).status(201).json(userExist);
  } catch (error) {
    console.log(error);
    return res.status(500).json("somthing went wrong in login.");
  }
};
