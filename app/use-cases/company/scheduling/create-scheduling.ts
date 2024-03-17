import { AppDataSource } from "app/data-source";
import { Company, Scheduling } from "app/entity";
import { FindService } from "../services";
import { CreateSchedulingDTO } from "app/dto";
import { GetCompany } from "../account";

export class CreateScheduling {
  private static repository = AppDataSource.getRepository(Scheduling);

  public static async handle(companyId: number, data: CreateSchedulingDTO) {
    const company = await GetCompany.handle(companyId);
    const service = await FindService.handle(companyId, data.service_id);

    const scheduling = new Scheduling();

    const [hour, minute] = data.start.split(":").map(Number);

    const startTime = new Date(data.date);
    startTime.setHours(hour, minute);

    const endTime = new Date(data.date);
    endTime.setHours(hour, minute + service.duration_minutes);

    scheduling.amount = service.price;
    scheduling.date = new Date(data.date);
    scheduling.start = startTime;
    scheduling.end = endTime;
    scheduling.service = service;

    scheduling.company = company.publicProfile() as Company;

    await this.repository.save(scheduling);

    return scheduling
  }
}