import { checkSchema } from "express-validator";

export default {
  create: checkSchema({
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
}