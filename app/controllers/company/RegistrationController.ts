import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { RegistrationService } from "app/services/company";

class RegistrationController {
  static async saveCompany(req: Request, res: Response) {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(422).json(result);
    }

    const results = await RegistrationService.saveCompany(req.body);

    res.status(201).send(results);
  }
}

export default RegistrationController;