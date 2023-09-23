import exp from "constants";
import { Request, Response } from "express";
import { google } from "googleapis";
import dotenv from "dotenv";
import jwt, { JwtPayload } from "jsonwebtoken";

import User from "../models/userSchema.ts";
import {
  generateToken,
  generateUserName,
  JwtPayloadInterface,
} from "../helpers/authHelper.ts";

dotenv.config();

const oauth2Client = new google.auth.OAuth2(
  process.env.OAUTH_CLIENT_ID as string,
  process.env.OAUTH_CLIENT_SECRET as string,
  "https://localhost:443/api/v1/auth/google/callback"
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

// @desc - Handling the google auth callback which gives the authorization code
// @route - /auth/google/callback
// method - GET
// access -public
export const googleOAuthCallback = async (req: Request, res: Response) => {
  try {
    // getting the authorization code from the callback
    let { code } = req.query;

    if (!code) return res.status(401).json({ success: false });

    //getting the tokens and setting it for oauth2Client
    let { tokens } = await oauth2Client.getToken(code as string);
    oauth2Client.setCredentials(tokens);

    // getting the user details from the gmail
    const profile = await google
      .oauth2("v2")
      .userinfo.get({ auth: oauth2Client });

    // if the user exists then login the user or
    const userExist = await User.findOne({
      email: profile.data.email,
    });

    // if user already exists then generate the token and login
    if (userExist) {
      const token = generateToken(userExist._id, userExist.email);
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge : 60 * 60 * 24
      });
      return res.redirect("https://2a43-49-204-73-222.ngrok-free.app/chat");
    }
    const userName = generateUserName(profile.data.name!);

    // Create the user in DB with the username
    const user = await User.create({
      fullName: profile.data.name,
      email: profile.data.email,
      imgUrl: profile.data.picture,
      userName,
    });

    const token = generateToken(user._id, user.email);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    return res.redirect("https://2a43-49-204-73-222.ngrok-free.app/chat");
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const checkLogin = async (req: Request, res: Response) => {
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

    const populateUser = await User.findById(decodedToken.id).lean();
    console.log(populateUser);
    return res.json({
      success: true,
      populateUser,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
