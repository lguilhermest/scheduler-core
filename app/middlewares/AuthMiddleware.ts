import {
  Request,
  Response,
  NextFunction
} from "express";
import { HttpException } from "app/exceptions";

export default class AuthMiddleware {
  public static user(req: Request, res: Response, next: NextFunction) {
    if(!req.session.company){
      throw new HttpException(401, "unauthenticated");
    }

    next();
  }
}