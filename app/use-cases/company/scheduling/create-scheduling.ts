import { Scheduling } from "app/entity";
import { FindService } from "../services";
import { CreateSchedulingDTO } from "app/dto";
import { GetCompany } from "../account";
import { HttpException } from "app/exceptions";
import { DataSource, Repository } from "typeorm";
import { CheckAvailability } from "./check-availability";

export class CreateScheduling {
  private repository: Repository<Scheduling>;
  private checkAvailability: CheckAvailability;

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(Scheduling);
    this.checkAvailability = new CheckAvailability(dataSource);
  }

  public async handle(companyId: number, data: CreateSchedulingDTO) {
    const scheduling = new Scheduling();

    const company = await GetCompany.handle(companyId);
    const service = await FindService.handle(companyId, data.service_id);

    const [hour, minute] = data.start.split(":").map(Number);

    const start = new Date();
    start.setHours(hour, minute, 0);

    const end = new Date()
    end.setHours(hour, minute + service.duration_minutes, 0);

    const isTimeAvailable = await this.checkAvailability.handle(company.id, {
      date: data.date,
      start: this.getTime(start),
      end: this.getTime(end),
      serviceId: data.service_id
    })

    if (!isTimeAvailable) {
      throw new HttpException(409, 'horário não disponível');
    }

    scheduling.amount = service.price;
    scheduling.date = new Date(data.date);
    scheduling.start = start;
    scheduling.end = end;
    scheduling.service = service;
    scheduling.company = company;

    await this.repository.save(scheduling);

    return scheduling;
  }

  private getTime(date: Date) {
    return ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
  }
}