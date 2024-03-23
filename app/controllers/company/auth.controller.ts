import { Request, Response } from "express";
import { Authenticate } from "app/use-cases/company";
import { AppDataSource } from "app/data-source";

export class AuthController {
  static async login(req: Request, res: Response) {
    const useCase = new Authenticate(AppDataSource);
    
    const data = await useCase.handle(req.body.email, req.body.password);

    res.status(201).send(data);
  }
}