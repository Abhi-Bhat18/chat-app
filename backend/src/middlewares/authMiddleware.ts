import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { UserAuthInfoRequest } from "../utils/interfaces";

dotenv.config();

export const jwtAuthGuard = (
  req: UserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { accessToken } = req.cookies;

    if (!accessToken)
      return res
        .status(400)
        .json({ success: false, message: "Invalid Request" });

    const decodedToken = jwt.verify(
      accessToken,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    if (decodedToken) {
      req.user!.id = decodedToken.id;
      req.user!.email = decodedToken.email
      next();
      return;
    } else
      return res.status(404).json({
        success: false,
        message: "Unauthorized access",
      });
  } catch (error) {

    
  }
};
