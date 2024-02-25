import express from "express";
import { AppDataSource } from "./data-source";

class App {
  public server: express.Application;

  constructor() {
    this.connectDB();
    this.server = express();
    this.middleware();
    this.router();
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
    this.server.get('/healthy-check', (res, req) => {
      req.sendStatus(200);
    })
  }
}

export default App;