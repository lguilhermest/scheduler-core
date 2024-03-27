import { checkSchema } from "express-validator";

export const AuthSchema = checkSchema({
  email: {
    isEmail: true
  },
  password: {
    isLength: { options: { min: 6 } }
  }
});