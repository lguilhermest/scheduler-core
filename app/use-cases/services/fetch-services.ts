import { Service } from "app/entity";

export class FetchServices {
  public static async handle(companyId: number) {
    const services = await Service.findBy({
      company: {
        id: companyId
      }
    });

    return services;
  }
}