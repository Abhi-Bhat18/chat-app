import { z } from "zod";

import { Request, Response, NextFunction } from "express";
import { ApiError } from "@chat/shared";

const requestBodyValidation = (schema: z.infer<z.AnyZodObject>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.safeParse(req.body);

      if (!result.success) {
        // const formatted = result.error.format();
        /* {
          name: { _errors: [ 'Expected string, received number' ] }
        } */

        // console.log("Zod error", result.error);
        throw new ApiError(422, 'Unprocessable data');
      } else next();
    } catch (error : any) {
      res.status(422).json({ error: error.message });
    }
  };
};

export default requestBodyValidation;
