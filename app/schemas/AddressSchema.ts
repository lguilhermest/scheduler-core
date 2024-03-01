import { body } from "express-validator";

export default [
  body('address.street').isString(),
  body('address.number').isString(),
  body('address.complement').isString().optional(),
  body('address.neighborhood').isString(),
  body('address.city').isString(),
  body('address.state').isString(),
];