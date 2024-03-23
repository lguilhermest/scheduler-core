import { Address, Company } from "app/entity";
import { DataSource, Repository } from "typeorm";

export class SaveCompany {
  private repository: Repository<Company>;
  private addressRepository: Repository<Address>;

  constructor(dataSource: DataSource){
    this.repository = dataSource.getRepository(Company);
    this.addressRepository = dataSource.getRepository(Address);
  }

  public async handle({ address, ...data }: Company & { address: Address }) {
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
      ...company,
      address: companyAddress
    };
  }
}