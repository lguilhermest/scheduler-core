import { DataSource, Repository } from "typeorm";
import { WorkingTime } from "app/entity";
import { HttpException } from "app/exceptions";
import { GetAccount } from "./get-account";

export class SaveWorkingTime {
  private repository: Repository<WorkingTime>;
  private getCompany: GetAccount;

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(WorkingTime);
    this.getCompany = new GetAccount(dataSource);
  }

  public async handle(companyId: number, weekDay: number, start: string, end: string) {
    if (weekDay < 0 || weekDay > 7) {
      throw new HttpException(422, "invalid day of week number");
    }

    const company = await this.getCompany.handle(companyId);

    let workingTime = await this.repository.findOneBy({
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

    return await this.repository.save(workingTime);
  }
}