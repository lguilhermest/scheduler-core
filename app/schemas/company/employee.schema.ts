import { checkSchema } from "express-validator";

export const SaveEmployeeSchema = checkSchema({
  name: {
    isString: true
  },
  phone: {
    isMobilePhone: {
      options: 'pt-BR'
    }
  },
  services: {
    optional: true,
    isArray: true
  }
});