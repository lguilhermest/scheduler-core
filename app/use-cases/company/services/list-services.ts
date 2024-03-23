import { AppDataSource } from "app/data-source";
import { Service } from "app/entity";
import { DataSource, Repository } from "typeorm";

export class ListServices {
  private repository: Repository<Service>;

  constructor(dataSource: DataSource){
    this.repository = dataSource.getRepository(Service);
  }

  public async handle(companyId: number) {
    const services = await this.repository.findBy({
      company: {
        id: companyId
      }
    });

    return services;
  }
}