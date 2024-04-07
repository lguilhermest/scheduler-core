import { Scheduling, WorkingTime } from "app/entity";
import { HttpException } from "app/exceptions";

type QueryParams = {
  date: Date;
  start: string;
  end: string;
  serviceId: number;
}

export class CheckAvailability {
  public static async handle(companyId: number, params: QueryParams) {
    const queryBuilder = Scheduling.createQueryBuilder();

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

  private static async validateWorkingTime(companyId: number, params: QueryParams) {
    const workingTime = await WorkingTime.findOneBy({
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