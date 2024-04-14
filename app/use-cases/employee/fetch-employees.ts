import { Employee } from "app/entity";

interface QueryAttributes {
  id?: number;
  companyId?: number;
  serviceId?: number;
}

export class FetchEmployees {
  public static async handle(params: QueryAttributes) {
    const employees = await Employee.find({
      where: {
        id: params.id,
        company: { id: params.companyId },
        services: [{ id: params.serviceId }]
      },
      relations: {
        services: true
      }
    });

    return employees;
  }
}