import { Company, Employee } from "app/entity";
import { AddService } from "./add-service";

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

    await employee.save();

    if (data.services) {
      try {
        for (const id of data.services) {
          await AddService.handle(employee, id)
        }
      } catch (error) { }
    }

    return employee;
  }
}