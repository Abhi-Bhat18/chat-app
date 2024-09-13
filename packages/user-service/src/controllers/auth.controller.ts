import { Request, Response } from "express";
import { google } from "googleapis";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { ApiResponse, ApiError, asyncHandler } from "@chat/shared";

import User from "../model/user.model";
import {
  generateToken,
  generateUserName,
  JwtPayloadInterface,
} from "../helpers/authHelper";


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

    if (!code) throw new ApiError(400, "Invalid Request");

    // get the token from the google by giving the CODE
    const { tokens } = await oauth2Client.getToken(code as string);
    oauth2Client.setCredentials(tokens);

    // get the user profile details from the token obtained by the google o auth token
    const profile = await google
      .oauth2("v2")
      .userinfo.get({ auth: oauth2Client });

    const userExist = await User.findOne({ email: profile.data.email });

    // if user exists then send him to the home page
    if (userExist) {
      const token = generateToken(userExist._id, userExist.email);
      res.cookie("token", token, { httpOnly: true });
      return res.redirect("http://localhost:3000/chat");
    }

    // else create the user with the user name
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

export const signUp = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // check if user already exists
  const userExist = await User.findOne({ email });

  if (userExist)
    throw new ApiError(
      409,
      "Already an account exists with this email please login"
    );

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create new user
  const user = await User.create({ ...req.body, password: hashedPassword });

  const token = generateToken(user._id, user.email);

  res.cookie("token", token, {
    httpOnly: true,
  });

  return res
    .status(201)
    .json(new ApiResponse(200, user, "User registered successfully"));
});

export const singIn = asyncHandler(async (req: Request, res: Response) => {
  const { password, email } = req.body;

  const user = await User.findOne({ email });

  if (!user) throw new ApiError(400, "Invalid email or password");

  if (!user.password) throw new ApiError(400, "Method not allowed");

  // check wether the password is correct
  if (!(await bcrypt.compare(password, user.password)))
    throw new ApiError(400, "Invalid Email or Password");

  const token = generateToken(user._id, user.email);

  res.cookie("token", token, { httpOnly: true });

  return res.json(new ApiResponse(200, user, "User logged in successfully"));
});
/**
 * Check if the user is logged in and return the user information if logged in.
 *
 * @param {Request} req - the request object
 * @param {Response} res - the response object
 * @return {Promise<void>} the result of the login check
 */
export const checkLogin = asyncHandler(async (req: Request, res: Response) => {
  const token = req.cookies.token;

  if (!token) throw new ApiResponse(401, "Unauthorized access");

  const decodedToken: any = jwt.verify(
    token,
    process.env.JWT_SECRET as string
  ) as JwtPayloadInterface; // if it fails it's gonna throw the error

  const populateUser = await User.findById(decodedToken._id).lean();

  if (!decodedToken) {
    return res.status(404).json({
      success: false,
      message: "Not able to find the resource",
    });
  }

  return res.json(
    new ApiResponse(200, populateUser, "User info fetched successfully")
  );
});

export const logOut = asyncHandler(async (req: Request, res: Response) => {

  // clear the cookie 
  res.clearCookie('token')

  return res.json(new ApiResponse(200, ))
});
