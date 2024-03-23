import { Request, Response } from "express";
import { CreateService, DeleteService, ListServices } from "app/use-cases/company/services";
import { AppDataSource } from "app/data-source";

class ServiceController {
  static async create(req: Request, res: Response) {
    const useCase = new CreateService(AppDataSource);

    const service = await useCase.handle(res.locals.user.id, req.body);

    res.status(201).send(service);
  }

  static async list(req: Request, res: Response) {
    const useCase = new ListServices(AppDataSource);

    const list = await useCase.handle(res.locals.user.id);

    res.status(200).send(list);
  }

  static async delete(req: Request, res: Response) {
    const useCase = new DeleteService(AppDataSource);

    const response = await useCase.handle(res.locals.user.id, Number(req.params.id));

    res.status(200).send(response);
  }
}

export default ServiceController;