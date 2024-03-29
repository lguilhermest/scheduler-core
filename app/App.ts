import express from "express";
import { AppDataSource } from "./data-source";
import * as routes from "./routes";
import { Exception } from "./exceptions";

class App {
  public server: express.Application;

  constructor() {
    this.connectDB();
    this.server = express();
    this.middleware();
    this.router();
    this.handler();
  }

  private connectDB() {
    AppDataSource
      .initialize()
      .then(() => {
        console.log("Data Source has been initialized!")
      })
      .catch((err) => {
        console.error("Error during Data Source initialization:", err)
      });
  }

  private middleware() {
    this.server.use(express.json());
  }

  private router() {
    this.server.get('/healthy-check', (res, req) => req.sendStatus(200));
    this.server.use('/company', routes.company);
  }

  private handler() {
    this.server.use(Exception.handler);
  }
}

export default App;