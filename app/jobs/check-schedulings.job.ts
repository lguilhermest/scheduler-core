import { CheckSchedulings } from "app/use-cases";
import cron from "node-cron";

export class CheckSchedulingsJob {
  private static task: cron.ScheduledTask;

  public static async handle() {
    this.task = cron.schedule('0 * * * * *', () => {
      CheckSchedulings.handle();
    });
  }
}