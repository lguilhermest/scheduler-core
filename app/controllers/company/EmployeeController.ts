import { Request, Response } from "express";
import { SaveEmployee } from "app/use-cases";
import Controller from "../controller";

export class EmployeeController extends Controller {
  static async save(req: Request, res: Response) {
    const employee = await SaveEmployee.handle(await EmployeeController.company(res), req.body);

    res.status(201).send(employee);
  }
}