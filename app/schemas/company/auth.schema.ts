import { checkSchema } from "express-validator";

export const AuthSchema = checkSchema({
  email: {
    isEmail: true
  },
  password: {
    isLength: { options: { min: 6 } }
  }
});

export const ChangePasswordSchema = checkSchema({
  password: {
    isLength: { options: { min: 6 } }
  },
  new_password: {
    isLength: { options: { min: 6 } }
  }
});

ChangePasswordSchema