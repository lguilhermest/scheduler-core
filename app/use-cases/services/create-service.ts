import { Company, Service, ServiceStatus } from "app/entity";

export class CreateService {
  public static async handle(
    company: Company,
    data: {
      name: string;
      description?: string;
      duration_minutes: number;
      price: number;
      status?: ServiceStatus;
    }): Promise<Service> {
    const service = Service.create({
      status: ServiceStatus.ACTIVE,
      company,
      ...data
    });

    await service.save();

    return service;
  }
}