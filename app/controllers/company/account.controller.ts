import { Request, Response } from "express";
import {
  FindCompany,
  SaveWorkingTime,
  UpdateCompanyPassword,
} from "app/use-cases";

export class AccountController {
  static async account(req: Request, res: Response) {
    const user = await FindCompany.handle({ id: res.locals.user.id }, { relations: true });

    res.send(user);
  }

  static async changePassword(req: Request, res: Response) {
    await UpdateCompanyPassword.handle(res.locals.user.id, req.body.password, req.body.new_password);

    res.send({
      message: 'senha alterada com sucesso'
    });
  }

  static async saveWorkingTime(req: Request, res: Response) {
    const response = await SaveWorkingTime.handle(
      res.locals.user.id,
      req.body.day_of_week,
      req.body.start,
      req.body.end,
    );

    res.status(201).send(response);
  }
}