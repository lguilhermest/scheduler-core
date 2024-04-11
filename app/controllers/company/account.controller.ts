import { Request, Response } from "express";
import {
  ConfirmEmail,
  FindCompany,
  SaveWorkingTime,
  SendVerificationCode,
  UpdateCompanyPassword,
} from "app/use-cases";
import Controller from "../controller";

export class AccountController extends Controller {
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

  static async sendVerificationEmail(req: Request, res: Response) {
    await SendVerificationCode.handle(await AccountController.company(res));

    res.status(200).send({
      message: 'enviado'
    });
  }

  static async confirmEmail(req: Request, res: Response) {
    await ConfirmEmail.handle(await AccountController.company(res), req.body.code);

    res.status(200).send({
      message: 'email confirmado'
    });
  }
}