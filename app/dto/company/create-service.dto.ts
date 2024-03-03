import { ServiceStatus } from "app/entity/service.entity";

export interface CreateServiceDTO {
  name: string;
  description?: string;
  duration_minutes: number;
  price: Number;
  status?: ServiceStatus;
}