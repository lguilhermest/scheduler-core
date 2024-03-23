import { Router as ExpressRouter } from "express";

export abstract class Router {
  protected router: ExpressRouter;

  constructor() {
    this.router = ExpressRouter();
  }

  init() {

  }

  getRouter() {
    return this.router;
  }
}