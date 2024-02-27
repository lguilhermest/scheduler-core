import { body } from "express-validator";

export default [
  body('password').isString().isLength({ min: 6 }),
  body('new_password').isString().isLength({ min: 6 })
]