import { Company } from "app/entity";
import { company } from "app/routes";
import { sendEmail } from "app/utils/email";

export class VericationCodeEmail {
  static async handle(user: Company, code: string) {
    await sendEmail(
      user.email,
      'Código de verificação',
      `
        <h1>Olá ${user.name}</h1>
        <p>Utilize o código ${code}</p>
        <p>Esse código expira em 5 minutos</p>
      `
    );
  }
}