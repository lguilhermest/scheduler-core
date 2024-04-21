import { Request, Response } from "express";
import { HttpException } from "app/exceptions";
import {
  CreateScheduling,
  DeleteScheduling,
  FetchSchedulings
} from "app/use-cases";
import Controller from "../controller";

export class SchedulingController extends Controller {
  public static async list(req: Request, res: Response) {
    const data = await FetchSchedulings.handle(res.locals.user.id, req.query);

    res.status(200).send(data);
  }

  public static async create(req: Request, res: Response) {
    const scheduling = await CreateScheduling.handle(SchedulingController.company(req), req.body);

    res.status(201).send(scheduling);
  }

  public static async update(req: Request, res: Response) {

  }

  public static async delete(req: Request, res: Response) {
    if (!req.params.id) {
      throw new HttpException(422, 'invalid id')
    }

    await DeleteScheduling.handle(res.locals.user.id, req.params.id);

    res.status(200).send({
      message: "agendamento excluído"
    });
  }
}