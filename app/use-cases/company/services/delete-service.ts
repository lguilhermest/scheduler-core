import { AppDataSource } from "app/data-source"
import { Service } from "app/entity"
import { HttpException } from "app/exceptions";
import { DataSource, Repository } from "typeorm";

export class DeleteService {
  private repository: Repository<Service>;

  constructor(dataSource: DataSource){
    this.repository = dataSource.getRepository(Service);
  }

  public async handle(companyId: number, serviceId: number) {
    const service = await this.repository.findOneBy({
      id: serviceId,
      company: {
        id: companyId
      }
    });

    if (!service) {
      throw new HttpException(404, 'serviço não encontrado');
    }

    await this.repository.remove(service);

    return {
      success: true,
      message: 'serviço removido com sucesso'
    }
  }
}