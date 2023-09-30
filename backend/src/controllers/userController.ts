import User from "../models/userSchema.ts";
import { UserAuthInfoRequest } from "../utils/interfaces.ts";
import { Response } from "express";

export const getAllUsers = async (req: UserAuthInfoRequest, res: Response) => {
  try {
    const users = await User.find().select("fullName userName imgUrl");
    if (!users)
      return res.status(404).json({
        success: false,
        message: "Unable to find the resource",
      });
    return res.json(users);
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: "Internal server Error",
    });
  }
};
