import { Scheduling, SchedulingStatus } from "app/entity";
import { HttpException } from "app/exceptions";
import { DataSource, Repository } from "typeorm";

export class DeleteScheduling {
  private repository: Repository<Scheduling>;

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(Scheduling);
  }

  public async handle(companyId: number, id: string) {
    const scheduling = await this.repository.findOne({
      where: {
        id
      }
    });

    if (!scheduling) {
      throw new HttpException(404, 'agendamento não encontrado');
    }

    if (scheduling.status !== SchedulingStatus.PENDING) {
      throw new HttpException(403, 'não é possível excluir esse agendamento');
    }

    await this.repository.remove(scheduling);
  }
}