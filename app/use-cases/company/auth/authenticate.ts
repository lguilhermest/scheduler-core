import { HttpException } from "app/exceptions";
import { Company } from "app/entity";
import { DataSource, Repository } from "typeorm";
import jwt from "jsonwebtoken";

export class Authenticate {
  private repository: Repository<Company>;

  constructor(dataSource: DataSource){
    this.repository = dataSource.getRepository(Company);
  }

  public async handle(email: string, password: string) {
    const company = await this.findCompany(email);

    if (!company) {
      throw new HttpException(401, 'credenciais inválidas');
    }

    const match = await company.validatePassword(password);

    if (!match) {
      throw new HttpException(401, 'credenciais inválidas');
    }

    const payload = { ...company };

    return {
      access_token: jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1h' }),
    };
  }

  private async findCompany(email: string) {
    return await this.repository.findOne({
      where: { email },
      select: ['id', 'email', 'password']
    });
  }
}