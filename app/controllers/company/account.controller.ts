import { Request, Response } from "express";
import { GetAccount, UpdatePassword } from "app/use-cases/company";
import { AppDataSource } from "app/data-source";

export class AccountController {
  static async account(req: Request, res: Response) {
    const useCase = new GetAccount(AppDataSource);

    const user = await useCase.handle(res.locals.user.id);

    res.send(user);
  }

  static async updatePassword(req: Request, res: Response) {
    const useCase = new UpdatePassword(AppDataSource);

    await useCase.handle(res.locals.user.id, req.body.password, req.body.new_password);

    res.send({
      message: 'senha alterada com sucesso'
    });

  }
}