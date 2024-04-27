import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import ApiError from "../utils/api/ApiErrot";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      error: {
        message: err.message,
        statusCode: err.statusCode,
      },
    });
  } else {
    // Default to 500 Internal Server Error if the error type is unknown
    res.status(500).json({
      error: {
        message: "Internal Server Error",
        statusCode: 500,
      },
    });
  }
};
