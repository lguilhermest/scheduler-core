import { Company } from "app/entity";
import { HttpException } from "app/exceptions";

export class UpdateCompanyPassword {
  public static async handle(id: number, password: string, newPassword: string) {
    const company = await Company.findOneBy({ id });

    if (!company) {
      throw new HttpException(401, 'credenciais inválidas');
    }

    const match = await company.validatePassword(password);

    if (!match) {
      throw new HttpException(401, 'credenciais inválidas');
    }

    await company.setPassword(newPassword);

    await company.save();
  }
}