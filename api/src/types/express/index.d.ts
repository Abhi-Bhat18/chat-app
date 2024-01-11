import { Express } from "express-serve-static-core";
import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    export interface Request {
      token?: {
        _id: string,
        email: string,
      }
      user?: any;
    }
  }
}