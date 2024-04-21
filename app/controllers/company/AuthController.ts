import { Request, Response } from "express";
import { Company } from "app/entity";
import { HttpException } from "app/exceptions";

export class AuthController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const company = await Company.findOne({
      where: { email },
      select: {
        status: true,
        id: true,
        name: true,
        email: true,
        phone: true,
        password: true,
        created_at: true,
        updated_at: true
      }
    });

    if (!company) {
      throw new HttpException(401, 'credenciais inválidas');
    }

    const match = await company.validatePassword(password);

    if (!match) {
      throw new HttpException(401, 'credenciais inválidas');
    }

    req.session.company = company;

    res.send("success");
  }

  static async logout(req: Request, res: Response) {
    req.session.destroy(() => {
      res.sendStatus(200);
    });
  }
}