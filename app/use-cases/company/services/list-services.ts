import { AppDataSource } from "app/data-source";
import { Service } from "app/entity";

class ListServices {
  private static repository = AppDataSource.getRepository(Service);

  static async handle(companyId: number) {
    const services = await this.repository.findBy({
      company: {
        id: companyId
      }
    });

    return services;
  }
}

export default ListServices;