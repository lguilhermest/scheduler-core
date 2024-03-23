import { Request, Response } from "express";
import { AccountService } from "app/services/company";

class CompanyController {
  static async account(req: Request, res: Response) {
    const user = await AccountService.account(res.locals.email);

    res.send(user);
  }

  static async updatePassword(req: Request, res: Response) {
    await AccountService.updatePassword(res.locals.user.id, req.body.password, req.body.new_password);

    res.status(200).send({
      message: 'senha alterada com sucesso'
    });

  }
}

export default CompanyController;