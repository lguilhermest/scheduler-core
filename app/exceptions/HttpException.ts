export class HttpException {
  declare status: number;
  declare message: any;

  constructor(status: number, message?: any) {
    this.message = message || 'http exception';
    this.status = status;
  }
}