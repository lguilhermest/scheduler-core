import { FindCompany } from "app/use-cases";
import { Response } from "express";

export default class Controller {
  protected static async company(res: Response){
    return await FindCompany.handle({ id: res.locals.user.id });
  }
}