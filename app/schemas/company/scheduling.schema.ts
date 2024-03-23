import { checkSchema } from "express-validator";

export default {
  create: checkSchema({
    service_id: {
      isInt: true
    },
    date: {
      isString: true
    },
    start: {
      isTime: true
    }
  })
}