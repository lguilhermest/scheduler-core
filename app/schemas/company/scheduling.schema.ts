import { checkSchema } from "express-validator";

export const CreateSchedulingSchema = checkSchema({
  service_id: {
    isInt: true
  },
  date: {
    isString: true
  },
  start: {
    isTime: true
  }
});