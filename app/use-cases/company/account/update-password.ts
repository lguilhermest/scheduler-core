import { Company } from "app/entity";
import { HttpException } from "app/exceptions";
import { DataSource, Repository } from "typeorm";

export class UpdatePassword {
  private repository: Repository<Company>;

  constructor(dataSource: DataSource){
    this.repository = dataSource.getRepository(Company);
  }

  public async handle(id: number, password: string, newPassword: string) {
    const company = await this.repository.findOneBy({ id }) as Company;

    const match = await company.validatePassword(password);

    if (!match) {
      throw new HttpException(401, 'credenciais inválidas');
    }

    await company.setPassword(newPassword);

    await this.repository.save(company);
  }
}