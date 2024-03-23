import { Company } from "app/entity";
import { HttpException } from "app/exceptions";
import { DataSource, Repository } from "typeorm";

export class GetAccount {
  private repository: Repository<Company>;

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(Company);
  }

  public async handle(id: number): Promise<Company> {
    const company = await this.repository.findOne({
      where: { id },
      relations: [
        'addresses',
        'services'
      ]
    });

    if (!company) {
      throw new HttpException(404, 'conta não encontrada');
    }

    return company;
  }
}