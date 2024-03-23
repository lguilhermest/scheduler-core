import { checkSchema } from "express-validator";

export const CreateServiceSchema = checkSchema({
  name: {
    isString: true
  },
  description: {
    optional: true,
    isString: true
  },
  duration_minutes: {
    isInt: true
  }
})