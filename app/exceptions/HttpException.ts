export class HttpException {
  private status: number;
  private message: any;
  private error?: any;

  constructor(status: number, message?: string, error?: any) {
    this.message = message || 'http exception';
    this.error = error;
    this.status = status;
  }
}