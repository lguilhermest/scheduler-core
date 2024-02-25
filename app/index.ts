import express from "express";

class App {
  public server: express.Application;

  constructor(){
    this.server = express();
    this.middleware();
    this.router();
  }

  private middleware(){
    this.server.use(express.json());
  }

  private router(){
    this.server.get('/healthy-check', (res, req) => {
      req.sendStatus(200);
    })
  }
}

export default App;