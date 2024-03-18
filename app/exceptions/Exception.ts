import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import UnprocessableContentException from "./UnprocessableContentException";

class Exception {
  declare status: number;
  declare message: string;

  constructor(status: number, message?: string) {
    this.message = message || 'http exception';
    this.status = status;
  }

  public static handler(err: Error | any, req: Request, res: Response, next: NextFunction) {
    const { status = 500, ...rest } = err;
    console.log(err);

    res.status(status).send(rest);
  }

  public static asyncHandler(fn: (req: Request, res: Response, next: NextFunction) => any) {
    return function (req: Request, res: Response, next: NextFunction) {
      const result = validationResult(req);

      if (!result.isEmpty()) {
        throw new UnprocessableContentException(result);
      }

      Promise
        .resolve(fn(req, res, next))
        .catch((error) => {
          next(error);
        });
    }
  }
}

export default Exception;