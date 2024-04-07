import { Service, ServiceStatus } from "app/entity";
import { FindCompany } from "../company";

export class CreateService {
  public static async handle(
    companyId: number,
    data: {
      name: string;
      description?: string;
      duration_minutes: number;
      price: number;
      status?: ServiceStatus;
    }): Promise<Service> {
    const company = await FindCompany.handle({ id: companyId });

    const service = Service.create({
      status: ServiceStatus.ACTIVE,
      company,
      ...data
    });

    await service.save();

    return service;
  }
}