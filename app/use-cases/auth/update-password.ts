import { Company } from "app/entity";
import { HttpException } from "app/exceptions";
import { Repository } from "typeorm";

export class UpdatePassword {
  private repository: Repository<Company>;

  constructor(repository: Repository<Company>) {
    this.repository = repository;
  }

  public async handle(id: number, password: string, newPassword: string) {
    const user = await this.repository.findOneBy({ id });

    if (!user) {
      throw new HttpException(401, 'credenciais inválidas');
    }

    const match = await user.validatePassword(password);

    if (!match) {
      throw new HttpException(401, 'credenciais inválidas');
    }

    await user.setPassword(newPassword);

    await this.repository.save(user);
  }
}