import { Company } from "app/entity";
import { AppDataSource } from "app/data-source";
import { UnauthorizedException } from "app/exceptions";

class AccountService {
  static repository = AppDataSource.getRepository(Company);

  static async account(email: string) {
    const company = await this.repository.findOne({
      where: { email },
      relations: [
        'addresses',
        'services'
      ]
    });

    return company;
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

  static async getAuthValues(email: string) {
    const company = await this.repository.findOne({
      where: { email },
      select: ['id', 'email', 'password']
    });

    return company;
  }
}

export default AccountService;