import { Scheduling } from "app/entity";
import { format } from "date-fns";
import { DataSource, Repository } from "typeorm";

export type SchedulingQueryParms = {
  from?: string;
  until?: string;
  date?: string;
  start?: Date | string;
  startRule?: '=' | '>' | '>=' | '<' | '<=';
  end?: Date | string;
  endRule?: '=' | '>' | '>=' | '<' | '<=';
  serviceId?: number;
}
export class ListSchedulings {
  private repository: Repository<Scheduling>;

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(Scheduling);
  }

  public async handle(companyId: number, params?: SchedulingQueryParms) {
    const queryBuilder = this.repository.createQueryBuilder();

    queryBuilder
      .select("scheduling")
      .from(Scheduling, "scheduling")
      .leftJoinAndSelect('scheduling.company', 'company')
      .leftJoinAndSelect('scheduling.service', 'service')
      .where("company.id = :companyId", { companyId });

    if (params?.serviceId) {
      queryBuilder.andWhere("service.id = :serviceId", { serviceId: params.serviceId });
    }

    if (params?.date) {
      queryBuilder.andWhere("DATE(scheduling.date) = DATE(:date)", { date: params.date });
    }

    if (params?.start) {
      const formattedTime = typeof params.start === 'object' ? format(params.start, 'HH:mm') : params.start;

      queryBuilder.andWhere(`scheduling.start ${params.startRule || '='} :start`, { start: formattedTime });
    }

    if (params?.end) {
      const formattedTime = typeof params.end === 'object' ? format(params.end, 'HH:mm') : params.end;
      
      queryBuilder.andWhere(`scheduling.end ${params.endRule || '='} :end`, { end: formattedTime });
    }

    return await queryBuilder.getMany();
  }
}