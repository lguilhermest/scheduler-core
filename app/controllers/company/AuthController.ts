import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { AuthService } from "app/services/company";
import { UnprocessableContentException } from "app/exceptions";

class AuthController {
  static async login(req: Request, res: Response) {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      throw new UnprocessableContentException(result);
    }

    const data = await AuthService.authenticate(req.body.email, req.body.password)

    res.status(201).send(data);
  }
}

export default AuthController;