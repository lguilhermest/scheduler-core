class NotFoundException {
  declare status: number;
  declare message: string;

  constructor(message?: string) {
    this.message = message || 'not found';
    this.status = 404;
  }
}

export default NotFoundException;