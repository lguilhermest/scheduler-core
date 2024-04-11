import { body, checkSchema } from "express-validator";

export const ChangePasswordSchema = checkSchema({
  password: {
    isLength: { options: { min: 6 } }
  },
  new_password: {
    isLength: { options: { min: 6 } }
  }
});

export const SaveWorkingTimeSchema = checkSchema({
  day_of_week: {
    isInt: { options: { min: 0, max: 6 } }
  },
  start: {
    isTime: true
  }
})