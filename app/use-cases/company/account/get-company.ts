import { AppDataSource } from "app/data-source";
import { Company } from "app/entity";
import { HttpException } from "app/exceptions";

class GetCompany {
  private static repository = AppDataSource.getRepository(Company);

  static async handle(id: number): Promise<Company> {
    const company = await this.repository.findOneBy({ id });

    if (!company) {
      throw new HttpException(404, 'conta não encontrada');
    }

    return company;
  }
}

export default GetCompany;