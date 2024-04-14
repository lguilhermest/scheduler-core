import { Company, CompanyStatus } from "app/entity";
import { HttpException } from "app/exceptions";
import cache from "app/utils/cache";

export class ConfirmEmail {
  public static async handle(company: Company, code: string) {
    if (company.status === 'ACTIVE') {
      throw new HttpException(400, "email já confirmado");
    }

    const cacheValue = cache.get(company.email);
    
    if (cacheValue !== code) {
      throw new HttpException(401, "código inválido")
    }

    company.status = CompanyStatus.ACTIVE;
    company.save();
  }
}