import { Request, Response, NextFunction } from "express";

class Exception {
  public static handler(err: Error | any, req: Request, res: Response, next: NextFunction) {
    const { status = 500, ...rest } = err;
    res.status(status).send(rest);
  }

  public static asyncHandler(fn: (req: Request, res: Response, next: NextFunction) => any) {
    return function (req: Request, res: Response, next: NextFunction) {
      Promise.resolve(fn(req, res, next)).catch((error) => {
        next(error);
      })
    }
  }
}

export default Exception;