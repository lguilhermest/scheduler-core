import { checkSchema } from "express-validator";

export const AddressSchema = checkSchema({
  'address.zip_code': {
    isLength: {
      options: {
        min: 8,
        max: 8
      },
    }
  },
  'address.street': {
    isString: true
  },
  'address.number': {
    isString: true
  },
  'address.complement': {
    optional: true,
    isString: true
  },
  'address.neighborhood': {
    isString: true
  },
  'address.city': {
    isString: true
  },
  'address.state': {
    isString: true
  },
})