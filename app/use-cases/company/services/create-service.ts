import { DataSource, Repository } from "typeorm";
import { CreateServiceDTO } from "app/dto";
import { AppDataSource } from "app/data-source";
import { GetAccount } from "../account";
import { Service, ServiceStatus } from "app/entity";

export class CreateService {
  private repository: Repository<Service>;

  constructor(dataSource: DataSource){
    this.repository = dataSource.getRepository(Service);
  }

  public async handle(companyId: number, data: CreateServiceDTO): Promise<Service> {
    const useCase = new GetAccount(AppDataSource);
    const company = await useCase.handle(companyId);
    
    const service = this.repository.create({
      status: ServiceStatus.ACTIVE,
      company,
      ...data
    });

    await this.repository.save(service);

    return service;
  }
}