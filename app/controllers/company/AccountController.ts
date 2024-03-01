import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { UnprocessableContentException } from "app/exceptions";
import { AccountService } from "app/services/company";

class CompanyController {
  static async account(req: Request, res: Response) {
    const user = await AccountService.account(res.locals.email);

    res.send(user);
  }

  static async updatePassword(req: Request, res: Response) {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      throw new UnprocessableContentException(result);
    }

    await AccountService.updatePassword(res.locals.id, req.body.password, req.body.new_password);

    res.status(200).send({
      message: 'senha alterada com sucesso'
    });

  }
}

export default CompanyController;