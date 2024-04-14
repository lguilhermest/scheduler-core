import { Request, Response } from "express";
import { SaveCompany } from "app/use-cases/company";

export class RegistrationController {
  static async saveCompany(req: Request, res: Response) {
    const results = await SaveCompany.handle(req.body);

    res.status(201).send(results);
  }
}