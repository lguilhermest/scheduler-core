import { Scheduling, WorkingTime } from "app/entity";
import { HttpException } from "app/exceptions";
import { DataSource, Repository } from "typeorm";

type QueryParams = {
  date: Date;
  start: string;
  end: string;
  serviceId: number;
}

export class CheckAvailability {
  private repository: Repository<Scheduling>;
  private workingTimeRepository: Repository<WorkingTime>;

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(Scheduling);
    this.workingTimeRepository = dataSource.getRepository(WorkingTime);
  }

  public async handle(companyId: number, params: QueryParams) {
    const queryBuilder = this.repository.createQueryBuilder();

    const { date, start, end, serviceId } = params;
    
    await this.validateWorkingTime(companyId, params);

    const res = await queryBuilder
      .select("scheduling")
      .from(Scheduling, "scheduling")
      .leftJoinAndSelect('scheduling.company', 'company')
      .leftJoinAndSelect('scheduling.service', 'service')
      .where("company.id = :companyId", { companyId })
      .andWhere("service.id = :serviceId", { serviceId })
      .andWhere("scheduling.date = :date", { date })
      .andWhere(":start < scheduling.end AND :end > scheduling.start", { start, end })
      .getMany();

    return res.length === 0;
  }

  private async validateWorkingTime(companyId: number, params: QueryParams) {
    const workingTime = await this.workingTimeRepository.findOneBy({
      company: { id: companyId },
      week_day: params.date.getDay()
    });

    if (!workingTime) {
      throw new HttpException(403, "dia da semana não disponível para agendamento");
    }

    const openingDate = new Date(`1970-01-01T${workingTime.start}`);
    const closingDate = new Date(`1970-01-01T${workingTime.end}`);
    const startDate = new Date(`1970-01-01T${params.start}`);
    const endDate = new Date(`1970-01-01T${params.end}`);

    if (!(startDate >= openingDate && endDate <= closingDate)) {
      throw new HttpException(403, "agendamento fora do horário de atendimento");
    }
  }
}