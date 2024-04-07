import { Address, Company } from "app/entity";

export class SaveCompany {
  public static async handle({ address, ...data }: Company & { address: Address }) {
    const company = Company.create(data as Company);

    await company.hashPassword();

    await company.save();

    const companyAddress = Address.create({
      ...address,
      company
    });

    await companyAddress.save();

    delete companyAddress.company;

    return await Company.findOne({
      where: {
        id: company.id
      },
      relations: ['addresses']
    })
  }
}