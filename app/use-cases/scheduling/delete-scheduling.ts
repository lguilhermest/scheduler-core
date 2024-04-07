import { Scheduling, SchedulingStatus } from "app/entity";
import { HttpException } from "app/exceptions";

export class DeleteScheduling {
  public static async handle(companyId: number, id: string) {
    const scheduling = await Scheduling.findOne({
      where: {
        id,
        company: {
          id: companyId
        }
      }
    });

    if (!scheduling) {
      throw new HttpException(404, 'agendamento não encontrado');
    }

    if (scheduling.status !== SchedulingStatus.PENDING) {
      throw new HttpException(403, 'não é possível excluir esse agendamento');
    }

    await scheduling.remove();
  }
}