import { Company } from "app/entity";
import { AppDataSource } from "app/data-source";
import { UnauthorizedException } from "app/exceptions";
import jwt from "jsonwebtoken";
import AccountService from "./AccountService";

class AuthService {
  static repository = AppDataSource.getRepository(Company);

  static async authenticate(email: string, password: string) {
    const company = await AccountService.company(email);

    if (!company) {
      throw new UnauthorizedException('credenciais inválidas');
    }

    const match = await company.validatePassword(password);

    if (!match) {
      throw new UnauthorizedException('credenciais inválidas');
    }

    return {
      access_token: jwt.sign(company.publicProfile(), process.env.JWT_SECRET as string, { expiresIn: '1h' }),
      account: company.publicProfile()
    };
  }
}

export default AuthService;