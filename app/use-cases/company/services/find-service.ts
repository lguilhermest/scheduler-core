import { Service } from "app/entity";
import { HttpException } from "app/exceptions";
import { DataSource, Repository } from "typeorm";

export class FindService {
  private repository: Repository<Service>;

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(Service)
  }

  public async handle(companyId: number, serviceId: number) {
    const service = await this.repository.findOneBy({
      id: serviceId,
      company: {
        id: companyId
      }
    });

    if (!service) {
      throw new HttpException(404, "serviço não encontrado");
    }

    return service;
  }
}