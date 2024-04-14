import { Company, Employee, Service } from "app/entity";
import { HttpException } from "app/exceptions";

interface Props {
  name: string;
  phone: string;
  services?: number[];
}

export class SaveEmployee {
  public static async handle(company: Company, data: Props): Promise<Employee> {
    const employee = new Employee();

    employee.name = data.name;
    employee.phone = data.phone;
    employee.company = company;

    if (data.services) {
      const list: Service[] = [];

      for (const id of data.services) {
        const service = await Service.findOneBy({
          id,
          company: {
            id: company.id
          }
        });

        if (service) {
          list.push(service);
          continue;
        }

        throw new HttpException(404, `serviço (${id}) não encontrado`);
      }

      employee.services = list
    }

    return await employee.save();
  }
}