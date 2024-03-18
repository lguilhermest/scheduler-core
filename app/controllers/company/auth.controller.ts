import { Request, Response } from "express";
import { Authenticate } from "app/use-cases/company";

export class AuthController {
  static async login(req: Request, res: Response) {
    const data = await Authenticate.handle(req.body.email, req.body.password);

    res.status(201).send(data);
  }
}