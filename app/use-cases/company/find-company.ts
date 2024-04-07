import { Company } from "app/entity";
import { HttpException } from "app/exceptions";
import { FindOptionsSelect } from "typeorm";

export class FindCompany {
  private static relations = ['addresses', 'working_time'];

  public static async handle(where: { id?: number, email?: string }, params?: { relations?: string[] | boolean, select?: FindOptionsSelect<Company> }): Promise<Company> {
    const company = await Company.findOne({
      where,
      relations: typeof params?.relations === 'boolean' ? this.relations : params?.relations,
      select: params?.select
    });

    if (!company) {
      throw new HttpException(404, 'conta não encontrada');
    }

    return company;
  }
}