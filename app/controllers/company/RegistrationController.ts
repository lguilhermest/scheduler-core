import { Request, Response } from "express";
import { RegistrationService } from "app/services/company";

class RegistrationController {
  static async saveCompany(req: Request, res: Response) {
    const results = await RegistrationService.saveCompany(req.body);

    res.status(201).send(results);
  }
}

export default RegistrationController;