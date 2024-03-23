import { checkSchema } from "express-validator";
import { AppDataSource } from "../../data-source";
import { Company } from "../../entity";

export const RegistrationSchema = checkSchema({
  name: {
    isString: true
  },
  email: {
    isEmail: true,
    custom: {
      options: async (email) => {
        const company = await AppDataSource.getRepository(Company).findOneBy({ email });

        if (company) {
          throw new Error('email already in use');
        }
      }
    }
  },
  phone: {
    isMobilePhone: {
      options: 'pt-BR'
    }
  },
  password: {
    isString: true
  }
})