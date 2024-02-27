import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { UnauthorizedException, UnprocessableContentException } from "../../exceptions";
import CompanyService from "../../services/company/CompanyService";
import jwt from "jsonwebtoken";

class AuthController {
  static async login(req: Request, res: Response) {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      throw new UnprocessableContentException(result);
    }

    const company = await CompanyService.findByEmail(req.body.email);

    if (!company) {
      throw new UnauthorizedException('credenciais inválidas');
    }

    const match = await company.validatePassword(req.body.password);

    if (!match) {
      throw new UnauthorizedException('credenciais inválidas');
    }

    const access_token = jwt.sign(company.publicProfile(), process.env.JWT_SECRET as string, { expiresIn: '1h' });

    res.status(201).send({
      access_token
    })
  }
}

export default AuthController;