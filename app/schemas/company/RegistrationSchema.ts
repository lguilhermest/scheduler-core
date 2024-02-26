import { body } from "express-validator";
import { AppDataSource } from "../../data-source";
import { Company } from "../../entity";

export default [
  body('name').isString(),
  body('email').isEmail().custom(async (email) => {
    const company = await AppDataSource.getRepository(Company).findOneBy({ email });

    if (company) {
      throw new Error('email already in use');
    }
  }),
  body('phone').isMobilePhone('pt-BR'),
  body('password').isString().isLength({ min: 6 }),
]