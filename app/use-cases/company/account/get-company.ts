import { AppDataSource } from "app/data-source";
import { Company } from "app/entity";
import { NotFoundException } from "app/exceptions";

class GetCompany {
  private static repository = AppDataSource.getRepository(Company);

  static async handle(id: number): Promise<Company> {
    const company = await this.repository.findOneBy({ id });

    if (!company) {
      throw new NotFoundException('conta não encontrada');
    }

    return company;
  }
}

export default GetCompany;