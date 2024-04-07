import { WorkingTime } from "app/entity";
import { HttpException } from "app/exceptions";
import { FindCompany } from "./find-company";

export class SaveWorkingTime {
  public static async handle(companyId: number, weekDay: number, start: string, end: string) {
    if (weekDay < 0 || weekDay > 7) {
      throw new HttpException(422, "invalid day of week number");
    }

    const company = await FindCompany.handle({ id: companyId });

    let workingTime = await WorkingTime.findOneBy({
      company: {
        id: companyId
      },
      week_day: weekDay
    });

    if (!workingTime) {
      workingTime = new WorkingTime();
      workingTime.company = company;
      workingTime.week_day = weekDay;
    }

    workingTime.start = start;
    workingTime.end = end;

    return await workingTime.save();
  }
}