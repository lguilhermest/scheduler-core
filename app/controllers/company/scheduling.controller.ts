import { CreateScheduling } from "app/use-cases/company";
import { Request, Response } from "express";

class SchedulingController {
  public static async list(req: Request, res: Response) {
    
  }

  public static async create(req: Request, res: Response) {
    const scheduling = await CreateScheduling.handle(res.locals.id, req.body);

    res.status(201).send(scheduling);
  }

  public static async update(req: Request, res: Response) {

  }

  public static async delete(req: Request, res: Response) {

  }
}

export default SchedulingController;