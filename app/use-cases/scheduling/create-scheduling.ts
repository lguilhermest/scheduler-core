import { Scheduling } from "app/entity";
import { FindService } from "../services";
import { HttpException } from "app/exceptions";
import { CheckAvailability } from "./check-availability";
import { FindCompany } from "../company";
import { DateTime } from "luxon";

export class CreateScheduling {
  public static async handle(companyId: number, data: { date: string; start: string; service_id: number; }) {
    const scheduling = new Scheduling();

    const company = await FindCompany.handle({ id: companyId });
    const service = await FindService.handle(companyId, data.service_id);

    const date = DateTime.fromISO(data.date);
    const start = DateTime.fromISO(data.date + "T" + data.start);
    const end = DateTime.fromISO(data.date + "T" + data.start).plus({ minutes: service.duration_minutes });

    const isTimeAvailable = await CheckAvailability.handle(company.id, {
      date: date.toJSDate(),
      start: start.toLocaleString(DateTime.TIME_24_SIMPLE),
      end: end.toLocaleString(DateTime.TIME_24_SIMPLE),
      serviceId: data.service_id
    })

    if (!isTimeAvailable) {
      throw new HttpException(409, 'horário não disponível');
    }

    scheduling.date = new Date(data.date.replaceAll('-', '/'));
    scheduling.start = start.toJSDate();
    scheduling.end = end.toJSDate();
    scheduling.service = service;
    scheduling.company = company;

    await scheduling.save();

    return scheduling;
  }

  private static getTime(date: Date) {
    return ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
  }
}