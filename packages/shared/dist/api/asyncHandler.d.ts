import { RequestHandler, Request, Response, NextFunction } from "express";
export declare const asyncHandler: (
  requestHandler: RequestHandler
) => (req: Request, res: Response, next: NextFunction) => void;


