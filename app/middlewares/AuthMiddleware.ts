import {
  Request,
  Response,
  NextFunction
} from "express";
import { UnauthorizedException } from "app/exceptions";
import jwt from "jsonwebtoken";

export default class AuthMiddleware {
  public static user(req: Request, res: Response, next: NextFunction) {
    const token = AuthMiddleware.extractTokenFromHeader(req);

    if (typeof token !== 'string') {
      throw new UnauthorizedException();
    }

    try {
      const payload: any = jwt.verify(token, process.env.JWT_SECRET as string);

      if (!!payload.exp && Date.now() >= payload.exp * 1000) {
        throw new Error();
      }

      res.locals.user = payload;
      res.locals.token = token;
      
      next();
    } catch (error) {
      throw new UnauthorizedException("unauthenticated");
    }
  }

  private static extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}