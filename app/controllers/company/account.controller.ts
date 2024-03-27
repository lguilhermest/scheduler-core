import { Request, Response } from "express";
import { GetAccount, SaveWorkingTime, UpdatePassword } from "app/use-cases/company";
import { AppDataSource } from "app/data-source";

export class AccountController {
  static async account(req: Request, res: Response) {
    const useCase = new GetAccount(AppDataSource);

    const user = await useCase.handle(res.locals.user.id, ['addresses', 'services', 'working_time']);

    res.send(user);
  }

  static async changePassword(req: Request, res: Response) {
    const useCase = new UpdatePassword(AppDataSource);

    await useCase.handle(res.locals.user.id, req.body.password, req.body.new_password);

    res.send({
      message: 'senha alterada com sucesso'
    });
  }

  static async saveWorkingTime(req: Request, res: Response) {
    const useCase = new SaveWorkingTime(AppDataSource);

    const response = await useCase.handle(
      res.locals.user.id,
      req.body.day_of_week,
      req.body.start,
      req.body.end,
    );

    res.status(201).send(response);
  }
}