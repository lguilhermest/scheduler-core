import { Company, Scheduling } from "app/entity";
import { sendEmail } from "app/utils/email";
import { DateTime } from "luxon";

export class SchedulingExpiredEmail {
  static async handle(user: Company, scheduling: Scheduling) {
    const date = DateTime.fromISO(String(scheduling.date));

    try {
      await sendEmail(
        user.email,
        'Agendamento Expirado',
        `
          <h1>Agendamento Expirado</h1>
          <div class="card">
            <p>Id: ${scheduling.id}</p>
            <p>Data: ${date.toFormat('dd/LL')}</p>
            <p>Horário: ${String(scheduling.start).slice(0, 5)}</p>
          </div>
        `
      );
    } catch (error) {
      console.log("NOTIFICATION ERROR", error);
    }
  }
}