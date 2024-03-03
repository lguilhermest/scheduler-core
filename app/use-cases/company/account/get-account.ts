import { AppDataSource } from "app/data-source";
import { Company } from "app/entity";
import { NotFoundException } from "app/exceptions";

class GetAccount {
  private static repository = AppDataSource.getRepository(Company);

  static async handle(email: string): Promise<Partial<Company>> {
    const company = await this.repository.findOne({
      where: { email },
      relations: [
        'addresses',
        'services'
      ]
    });

    if (!company) {
      throw new NotFoundException('conta não encontrada');
    }

    return company.publicProfile();
  }
}

export default GetAccount;