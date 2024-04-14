import { Company, Employee, Service, ServiceStatus } from "app/entity";
import { In } from "typeorm";

interface Props {
  name: string;
  description?: string;
  duration_minutes: number;
  price: number;
  status?: ServiceStatus;
  employees?: number[];
}

export class CreateService {
  public static async handle(company: Company, data: Props): Promise<Service> {
    const service = Service.create({
      status: ServiceStatus.ACTIVE,
      company,
      ...data
    });

    if (data.employees) {
      const employees = await Employee.findBy({ id: In([data.employees]) });

      for (const employee of employees) {
        if (employee.services) {
          employee.services.push(service);
        } else {
          employee.services = [service];
        }
        await employee.save();
      }
    }

    await service.save();

    return service;
  }
}