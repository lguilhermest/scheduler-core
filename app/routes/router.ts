import {
  Router as ExpressRouter,
  NextFunction,
  Request,
  RequestHandler,
  Response
} from "express";
import { HttpException } from "app/exceptions";
import { validationResult } from "express-validator";

export default class Router {
  private router: ExpressRouter;

  constructor() {
    this.router = ExpressRouter();
  }

  private asyncHandler(handlers: RequestHandler[]) {
    return handlers.map((handler) => {
      if (typeof handler !== 'function') {
        return handler;
      }
      return function (req: Request, res: Response, next: NextFunction) {
        const result = validationResult(req);

        if (!result.isEmpty()) {
          throw new HttpException(422, "validation error", result.array());
        }

        Promise
          .resolve(handler(req, res, next))
          .catch((error) => { next(error); });
      }
    })
  }

  public get(path: string, ...handlers: Array<RequestHandler | any>) {
    this.router.get(path, this.asyncHandler(handlers));
  }

  public post(path: string, ...handlers: Array<RequestHandler | any>) {
    this.router.post(path, this.asyncHandler(handlers));
  }

  public put(path: string, ...handlers: Array<RequestHandler | any>) {
    this.router.put(path, this.asyncHandler(handlers));
  }

  public delete(path: string, ...handlers: Array<RequestHandler | any>) {
    this.router.delete(path, this.asyncHandler(handlers));
  }

  public use(...handlers: Array<RequestHandler>) {
    this.router.use(...handlers)
  }

  public getRouter(){
    return this.router;
  }
}