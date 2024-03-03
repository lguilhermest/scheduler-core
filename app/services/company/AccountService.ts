import { Company } from "app/entity";
import { AppDataSource } from "app/data-source";
import { UnauthorizedException } from "app/exceptions";

class AccountService {
  static repository = AppDataSource.getRepository(Company);

  static async company(email: string) {
    const company = await this.repository.findOne({
      where: { email },
      relations: [
        'addresses',
        'services'
      ]
    });

    return company;
  }

  static async account(email: string) {
    const company = await this.company(email) as Company;
    return company?.publicProfile();
  }

  static async updatePassword(id: number, password: string, newPassword: string) {
    const company = await this.repository.findOneBy({ id }) as Company;

    const match = await company.validatePassword(password);

    if (!match) {
      throw new UnauthorizedException('senha incorreta');
    }

    await company.setPassword(newPassword);

    await this.repository.save(company);
  }
}

export default AccountService;