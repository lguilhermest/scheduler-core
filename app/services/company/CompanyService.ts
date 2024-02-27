import { AppDataSource } from "../../data-source";
import { Company } from "../../entity";

class CompanyService {
  static repository = AppDataSource.getRepository(Company);

  static async findByEmail(email: string) {
    return await this.repository.findOneBy({ email })
  }
}

export default CompanyService;