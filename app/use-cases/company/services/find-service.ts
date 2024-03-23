import { AppDataSource } from "app/data-source";
import { Service } from "app/entity";
import { HttpException } from "app/exceptions";

class FindService {
  private static repository = AppDataSource.getRepository(Service);

  static async handle(companyId: number, serviceId: number) {
    const service = await this.repository.findOneBy({
      id: serviceId,
      company: {
        id: companyId
      }
    });

    if(!service){
      throw new HttpException(404, "serviço não encontrado");
    }

    return service;
  }
}

export default FindService;