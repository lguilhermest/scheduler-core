import { HttpException } from "app/exceptions";
import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export default class ErrorHandler {
  public static handler(err: Error | any, req: Request, res: Response, next: NextFunction) {
    const { status = 500, ...rest } = err;
    console.log(err);

    if (status === 500) {
      res.status(status).send({
        message: 'server error'
      })
    }

    res.status(status).send(rest);
  }

  public static asyncHandler(fn: (req: Request, res: Response, next: NextFunction) => any) {
    return function (req: Request, res: Response, next: NextFunction) {
      const result = validationResult(req);

      if (!result.isEmpty()) {
        throw new HttpException(422, "validation error",  result.array());
      }

      Promise
        .resolve(fn(req, res, next))
        .catch((error) => {
          next(error);
        });
    }
  }
}