import { HttpException } from "app/exceptions";
import { Company } from "app/entity";
import jwt from "jsonwebtoken";

export class AuthenticateCompany {
  public static async handle(email: string, password: string) {
    const company = await Company.findOne({
      where: { email },
      select: {
        status: true,
        id: true,
        name: true,
        email: true,
        phone: true,
        password: true,
        created_at: true,
        updated_at: true
      }
    });

    if (!company) {
      throw new HttpException(401, 'credenciais inválidas');
    }

    const match = await company.validatePassword(password);

    if (!match) {
      throw new HttpException(401, 'credenciais inválidas');
    }

    const { password: pass, ...rest } = company;
    const payload = { ...rest };

    return {
      access_token: jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1h' }),
    };
  }
}