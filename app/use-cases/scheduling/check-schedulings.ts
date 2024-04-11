import { DateTime } from "luxon";
import { Scheduling, SchedulingStatus } from "app/entity";
import { SchedulingExpiredEmail } from "app/notification/company";

export class CheckSchedulings {
  public static async handle() {
    const now = DateTime.now();

    const queryBuilder = Scheduling.createQueryBuilder()
      .select("scheduling")
      .from(Scheduling, "scheduling")
      .leftJoinAndSelect('scheduling.company', 'company')
      .where("(scheduling.date < :date OR (scheduling.date = :date AND scheduling.end < :time))", {
        date: now.toJSDate(),
        time: now.toFormat("HH:mm:ss")
      })
      .andWhere("scheduling.status = :status", { status: SchedulingStatus.PENDING });

    const schedulings = await queryBuilder.getMany();

    for (const scheduling of schedulings) {
      scheduling.status = SchedulingStatus.EXPIRED;
      await SchedulingExpiredEmail.handle(scheduling.company, scheduling);
      await scheduling.save();
    }
  }
}