import { Service } from "app/entity";
import { HttpException } from "app/exceptions";

export class FindService {
  public static async handle(companyId: number, serviceId: number) {
    const service = await Service.findOneBy({
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