import { Request, Response } from "express";
import { AuthService } from "app/services/company";

class AuthController {
  static async login(req: Request, res: Response) {
    const data = await AuthService.authenticate(req.body.email, req.body.password)

    res.status(201).send(data);
  }
}

export default AuthController;