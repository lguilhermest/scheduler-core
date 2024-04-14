import { checkSchema } from "express-validator";

export const SaveEmployeeSchema = checkSchema({
  password: {
    isLength: { options: { min: 6 } }
  },
  new_password: {
    isLength: { options: { min: 6 } }
  }
});