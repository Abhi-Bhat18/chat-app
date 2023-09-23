import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import { ObjectId } from "mongodb";

dotenv.config();

export interface JwtPayloadInterface {
  _id: string;
  email: string;
  iat: number;
  exp: number;
}


//generate the token
export const generateToken = (id: ObjectId, email: string) => {
  return jwt.sign({ id: id, email: email }, process.env.JWT_SECRET as string, {
    expiresIn: "7days",
  });
};

// generate the New userName
export const generateUserName = (fullName: string) => {
  const uuid = uuidv4(); // Generate UUID v4
  const uuidWithoutHyphens = uuid.replace(/-/g, ""); // Remove hyphens
  const name = fullName.slice(0, 6);
  return `${name}@${uuidWithoutHyphens.substring(0, 6)}`;
};
