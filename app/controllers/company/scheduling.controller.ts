import { AppDataSource } from "app/data-source";
import { CreateScheduling, ListSchedulings } from "app/use-cases/company";
import { Request, Response } from "express";

export class SchedulingController {
  public static async list(req: Request, res: Response) {
    const useCase = new ListSchedulings(AppDataSource);
    const data = await useCase.handle(res.locals.user.id, req.query);

    res.status(200).send(data);
  }

  public static async create(req: Request, res: Response) {
    const useCase = new CreateScheduling(AppDataSource);
    const scheduling = await useCase.handle(res.locals.user.id, req.body);

    res.status(201).send(scheduling);
  }

  public static async update(req: Request, res: Response) {

  }

  public static async delete(req: Request, res: Response) {

  }
}