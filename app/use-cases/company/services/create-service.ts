import { AppDataSource } from "app/data-source";
import { CreateServiceDTO } from "app/dto";
import Service, { ServiceStatus } from "app/entity/service.entity";
import GetCompany from "../account/get-company";

class CreateService {
  private static repository = AppDataSource.getRepository(Service);

  static async handle(companyId: number, data: CreateServiceDTO): Promise<Service> {
    const company = await GetCompany.handle(companyId);
    
    const service = this.repository.create({
      status: ServiceStatus.ACTIVE,
      company,
      ...data
    });

    await this.repository.save(service);

    return service;
  }
}

export default CreateService;