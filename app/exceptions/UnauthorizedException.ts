class UnauthorizedException {
  declare status: number;
  declare message: string;

  constructor(message?: string) {
    this.message = message || 'unauthorized';
    this.status = 401;
  }
}

export default UnauthorizedException;