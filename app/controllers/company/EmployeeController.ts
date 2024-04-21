import { Request, Response } from "express";
import { AddService, FetchEmployees, SaveEmployee } from "app/use-cases/employee";
import Controller from "../controller";

export class EmployeeController extends Controller {
  static async save(req: Request, res: Response) {
    const employee = await SaveEmployee.handle(EmployeeController.company(req), req.body);

    res.status(201).send(employee);
  }

  static async fetch(req: Request, res: Response) {
    const company = EmployeeController.company(req)

    const employees = await FetchEmployees.handle({ companyId: company.id });

    return res.send(employees);
  }

  static async addService(req: Request, res: Response) {
    await AddService.handle(Number(req.params.id), Number(req.params.serviceId));

    return res.send({
      message: "ok"
    })
  }
}