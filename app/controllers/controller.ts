import { Company } from "app/entity";
import { Request } from "express";

export default class Controller {
  protected static company(req: Request): Company {
    return req.session.company as Company;
    // return await FindCompany.handle({ id: res.locals.user.id });
  }
}