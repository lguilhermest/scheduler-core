import { Employee, Service } from "app/entity";
import { HttpException } from "app/exceptions";


export class AddService {
  public static async handle(employee: number | Employee, service: number | Service) {
    if (typeof employee === 'number') {
      employee = await Employee.findOne({
        where: {
          id: employee
        },
        relations: {
          services: true
        }
      }) as Employee;
    }

    if (!employee) {
      throw new HttpException(404, "funcionário não encontrado");
    }

    const hasService = employee.services?.find(({ id }) =>
      id === (service instanceof Service ? service.id : service)
    );

    if (hasService) {
      return employee;
    }
    
    if (typeof service === 'number') {
      service = await Service.findOneBy({ id: service }) as Service;

      if (!service) {
        throw new HttpException(404, "serviço não encontrado");
      }

    } else {
      service = service;
    }

    if (employee.services) {
      employee.services.push(service as Service);
    } else {
      employee.services = [service as Service];
    }

    return await employee.save();
  }
}