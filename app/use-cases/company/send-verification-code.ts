import { VericationCodeEmail } from "app/notification/company";
import { generateCode } from "app/utils/string";
import { Company } from "app/entity";
import cache from "app/utils/cache";

export class SendVerificationCode {
  public static async handle(company: Company) {
    const code = generateCode();

    cache.set(company.email, code, 5 * 60);

    await VericationCodeEmail.handle(company, code);
  }
}