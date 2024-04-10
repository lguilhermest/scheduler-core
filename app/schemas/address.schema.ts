import { checkSchema } from "express-validator";

export const AddressSchema = checkSchema({
  'address.street': {
    isString: true,
    errorMessage: 'Street must be a string',
  },
  'address.number': {
    isString: true,
    errorMessage: 'Number must be a string',
  },
  'address.complement': {
    optional: true,
    isString: true,
    errorMessage: 'Complement must be a string',
  },
  'address.neighborhood': {
    isString: true,
    errorMessage: 'Neighborhood must be a string',
  },
  'address.city': {
    isString: true,
    errorMessage: 'City must be a string',
  },
  'address.state': {
    isString: true,
    errorMessage: 'State must be a string',
  },
})