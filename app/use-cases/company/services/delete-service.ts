import { AppDataSource } from "app/data-source"
import { Service } from "app/entity"
import { HttpException } from "app/exceptions";

class DeleteService {
  private static repository = AppDataSource.getRepository(Service);

  public static async handle(companyId: number, serviceId: number) {
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

export default DeleteService;