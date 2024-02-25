import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "password",
  database: "scheduler",
  synchronize: true,
  logging: true,
  entities: ["app/entity/*.ts"],
  subscribers: [],
  migrations: [],
})