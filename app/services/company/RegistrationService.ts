import { AppDataSource } from "../../data-source";
import { Address, Company } from "../../entity";

class RegistrationService {
  static repository = AppDataSource.getRepository(Company);
  static addressRepository = AppDataSource.getRepository(Address);

  static async saveCompany({ address, ...data }: Company & { address: Address }) {
    const company = this.repository.create(data);

    await company.hashPassword();

    await this.repository.save(company);

    const companyAddress = this.addressRepository.create({
      ...address,
      company
    });

    await this.addressRepository.save(companyAddress);

    delete companyAddress.company;

    return {
      ...company.publicProfile(),
      address: companyAddress
    };
  }
}

export default RegistrationService;