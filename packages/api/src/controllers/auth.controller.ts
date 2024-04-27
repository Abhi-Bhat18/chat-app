import { Request, Response } from "express";
import { google } from "googleapis";
import dotenv from "dotenv";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcryptjs";

import User from "../../../shared/models/user.model";
import {
  generateToken,
  generateUserName,
  JwtPayloadInterface,
} from "../helpers/authHelper";
import asyncHandler from "../utils/api/asyncHandler";
import ApiError from "../utils/api/ApiErrot";

dotenv.config();

const oauth2Client = new google.auth.OAuth2(
  process.env.OAUTH_CLIENT_ID as string,
  process.env.OAUTH_CLIENT_SECRET as string,
  "http://localhost:1337/api/v1/auth/google/callback"
);

// Access scopes for read-only Drive activity.
const scopes = [
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/userinfo.email",
];

// Generate a url that asks permissions for the Drive activity scope
const authorizationUrl = oauth2Client.generateAuthUrl({
  access_type: "offline",
  scope: scopes,
  include_granted_scopes: true,
});

export const googleOAuth = (req: Request, res: Response) => {
  return res.redirect(authorizationUrl);
};

/**
 * Handle the Google OAuth callback.
 *
 * @param {Request} req - the request object
 * @param {Response} res - the response object
 * @return {Promise<void>} promise indicating the completion of the function
 */
export const googleOAuthCallback = asyncHandler(
  async (req: Request, res: Response) => {
    const { code } = req.query;

    if (!code) {
      return res.status(401).json({ success: false });
    }

    const { tokens } = await oauth2Client.getToken(code as string);

    oauth2Client.setCredentials(tokens);

    const profile = await google
      .oauth2("v2")
      .userinfo.get({ auth: oauth2Client });
    const userExist = await User.findOne({ email: profile.data.email });

    if (userExist) {
      const token = generateToken(userExist._id, userExist.email);
      res.cookie("token", token, { httpOnly: true });
      return res.redirect("http://localhost:3000/chat");
    }

    const userName = generateUserName(profile.data.name!);

    const user = await User.create({
      fullName: profile.data.name,
      email: profile.data.email,
      imgUrl: profile.data.picture,
      userName,
    });

    const token = generateToken(user._id, user.email);

    res.cookie("token", token, { httpOnly: true });

    res.redirect("http://localhost:3000/");
  }
);

export const signUp = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // check if user already exists
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(409).json({
        success: false,
        message: "You already have an account, Please login",
      });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user
    const user = await User.create({ ...req.body, password: hashedPassword });

    const token = generateToken(user._id, user.email);

    res.cookie("token", token, {
      httpOnly: true,
    });
    return res.json({
      success: true,
      message: "User registered in successfully",
    });
  } catch (error) {
    console.log("Error", error);

    return res.status(500).json({
      success: false,
      message: "Internal server Error",
    });
  }
};

export const singIn = async (req: Request, res: Response) => {
  try {
    const { password, email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User data not found",
      });
    }

    if (!user.password) {
      return res.status(400).json({
        success: false,
        message: "Not allowed",
      });
    }

    // check wether the password is correct
    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = generateToken(user._id, user.email);

    res.cookie("token", token, { httpOnly: true });
    return res.json({
      success: true,
      message: "User logged in successfully",
    });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({
      success: false,
      message: "Internal server Error",
    });
  }
};
/**
 * Check if the user is logged in and return the user information if logged in.
 *
 * @param {Request} req - the request object
 * @param {Response} res - the response object
 * @return {Promise<void>} the result of the login check
 */
export const checkLogin = asyncHandler(async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;

    if (!token)
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });

    const decodedToken: any = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayloadInterface;

    if (!decodedToken)
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });

    const populateUser = await User.findById(decodedToken._id).lean();

    if (!decodedToken) {
      return res.status(404).json({
        success: false,
        message: "Not able to find the resource",
      });
    }

    return res.json({
      success: true,
      user: populateUser,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
