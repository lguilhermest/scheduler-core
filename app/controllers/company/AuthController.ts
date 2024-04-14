import { Request, Response } from "express";
import { AuthenticateCompany } from "app/use-cases";

export class AuthController {
  static async login(req: Request, res: Response) {
    const data = await AuthenticateCompany.handle(req.body.email, req.body.password);

    res.status(201).send(data);
  }
}