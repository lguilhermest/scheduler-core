class UnprocessableContentException {
  declare status: number;
  declare message: string;
  declare errors: any;

  constructor(errors?: any, message?: string) {
    this.message = message || 'unprocessable content';

    if (errors.errors) {
      this.errors = errors.errors;
    } else {
      this.errors = errors;
    }

    this.status = 422;
  }
}

export default UnprocessableContentException;