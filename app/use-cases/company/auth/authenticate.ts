import { UnauthorizedException } from "app/exceptions";
import { AppDataSource } from "app/data-source";
import { Company } from "app/entity";
import jwt from "jsonwebtoken";

export class Authenticate {
  private static repository = AppDataSource.getRepository(Company);

  public static async handle(email: string, password: string) {
    const company = await this.findCompany(email);

    if (!company) {
      throw new UnauthorizedException('credenciais inválidas');
    }

    const match = await company.validatePassword(password);

    if (!match) {
      throw new UnauthorizedException('credenciais inválidas');
    }

    const payload = { ...company };

    return {
      access_token: jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1h' }),
    };
  }

  private static async findCompany(email: string) {
    return await this.repository.findOne({
      where: { email },
      select: ['id', 'email', 'password']
    });
  }
}