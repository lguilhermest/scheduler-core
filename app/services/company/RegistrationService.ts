import { AppDataSource } from "../../data-source";
import { Company } from "../../entity";

class RegistrationService {
  static repository = AppDataSource.getRepository(Company);

  static async saveCompany(data: Company) {
    const company = this.repository.create(data);

    await company.hashPassword();

    await this.repository.save(company);

    return company.publicProfile();
  }
}

export default RegistrationService;