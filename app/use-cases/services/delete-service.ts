import { Service } from "app/entity"
import { HttpException } from "app/exceptions";

export class DeleteService {
  public static async handle(companyId: number, serviceId: number) {
    const service = await Service.findOneBy({
      id: serviceId,
      company: {
        id: companyId
      }
    });

    if (!service) {
      throw new HttpException(404, 'serviço não encontrado');
    }

    await service.remove();

    return {
      success: true,
      message: 'serviço removido com sucesso'
    }
  }
}