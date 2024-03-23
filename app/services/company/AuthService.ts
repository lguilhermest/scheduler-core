import { Company } from "app/entity";
import { AppDataSource } from "app/data-source";
import { HttpException } from "app/exceptions";
import jwt from "jsonwebtoken";
import AccountService from "./AccountService";

class AuthService {
  static repository = AppDataSource.getRepository(Company);

  static async authenticate(email: string, password: string) {
    const company = await AccountService.getAuthValues(email);

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
}

export default AuthService;