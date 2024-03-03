import { AppDataSource } from "app/data-source"
import { Service } from "app/entity"
import { NotFoundException } from "app/exceptions";

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
      throw new NotFoundException('serviço não encontrado');
    }

    await this.repository.remove(service);

    return {
      success: true,
      message: 'serviço removido com sucesso'
    }
  }
}

export default DeleteService;