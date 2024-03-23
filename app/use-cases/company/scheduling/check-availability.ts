import { Scheduling } from "app/entity";
import { DataSource, Repository } from "typeorm";

type QueryParams = {
  date: string;
  start: Date | string;
  end: Date | string;
  serviceId: number;
}

export class CheckAvailability {
  private repository: Repository<Scheduling>;

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(Scheduling);
  }

  public async handle(companyId: number, params: QueryParams) {
    const queryBuilder = this.repository.createQueryBuilder();

    const { date, start, end, serviceId } = params;

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
}