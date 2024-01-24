import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const checkUserValidate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.access_token;
  if (!token)
    return res.status(401).json({ message: "Access token not valid" });
  try {
    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET!, (err: any, user: any) => {
      if (err) {
        return res
          .status(401)
          .json({ message: "Unauthorized - Invalid token" });
      }
      // Attach the user object to the request for further use in the route
      req.user = user;

      // Continue with the request
      next();
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json("somthing went wrong validate function");
  }
};
