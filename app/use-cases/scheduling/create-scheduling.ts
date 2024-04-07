import { Scheduling } from "app/entity";
import { FindService } from "../services";
import { HttpException } from "app/exceptions";
import { CheckAvailability } from "./check-availability";
import { FindCompany } from "../company";

export class CreateScheduling {
  public static async handle(companyId: number, data: { date: string; start: string; service_id: number; }) {
    const scheduling = new Scheduling();

    const company = await FindCompany.handle({ id: companyId });

    const service = await FindService.handle(companyId, data.service_id);

    const [hour, minute] = data.start.split(":").map(Number);

    const start = new Date();
    start.setHours(hour, minute, 0);

    const end = new Date()
    end.setHours(hour, minute + service.duration_minutes, 0);

    const isTimeAvailable = await CheckAvailability.handle(company.id, {
      date: new Date(data.date.replaceAll('-', '/')),
      start: this.getTime(start),
      end: this.getTime(end),
      serviceId: data.service_id
    })

    if (!isTimeAvailable) {
      throw new HttpException(409, 'horário não disponível');
    }

    scheduling.date = new Date(data.date.replaceAll('-', '/'));
    scheduling.start = start;
    scheduling.end = end;
    scheduling.service = service;
    scheduling.company = company;

    await scheduling.save();

    return scheduling;
  }

  private static getTime(date: Date) {
    return ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
  }
}