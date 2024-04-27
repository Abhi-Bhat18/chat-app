import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

export const jwtAuthGuard = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.cookies;

    if (!token)
      return res
        .status(400)
        .json({ success: false, message: "Invalid Request" });

    const verifiedToken = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    
    if (verifiedToken) {
      req.token = verifiedToken;
      next();
      return;
    } else
      return res.status(404).json({
        success: false,
        message: "Unauthorized access",
      });
  } catch (error) {

    console.log("Error", error);
    
  }
};
