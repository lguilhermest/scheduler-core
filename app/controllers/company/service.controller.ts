import { Request, Response } from "express";
import { CreateService, DeleteService, ListServices } from "app/use-cases/company/services";

class ServiceController {
  static async create(req: Request, res: Response) {
    const service = await CreateService.handle(res.locals.user.id, req.body);

    res.status(201).send(service);
  }

  static async list(req: Request, res: Response) {
    const list = await ListServices.handle(res.locals.user.id);

    res.status(200).send(list);
  }

  static async delete(req: Request, res: Response) {
    const response = await DeleteService.handle(res.locals.user.id, Number(req.params.id));

    res.status(200).send(response);
  }
}

export default ServiceController;