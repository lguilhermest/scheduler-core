import { Company } from "app/entity";
import { AccountStatus } from "app/entity/authenticable.entity";
import { HttpException } from "app/exceptions";
import cache from "app/utils/cache";

export class ConfirmEmail {
  public static async handle(company: Company, code: string) {
    const res = cache.get(code);

    if (company.status === 'ACTIVE') {
      throw new HttpException(400, "email já confirmado");
    }

    if (!res || res !== company.email) {
      throw new HttpException(401, "código inválido")
    }

    company.status = AccountStatus.ACTIVE;
    company.save();
  }
}