import { Request, Response } from "express";
import { SaveCompany } from "app/use-cases/company";
import { AppDataSource } from "app/data-source";

export class RegistrationController {
  static async saveCompany(req: Request, res: Response) {
    const useCase = new SaveCompany(AppDataSource);
    
    const results = await useCase.handle(req.body);

    res.status(201).send(results);
  }
}