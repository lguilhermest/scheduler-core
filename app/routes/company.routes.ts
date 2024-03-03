import { Router } from "express";
import {
  AccountController,
  AuthController,
  RegistrationController,
  ServiceController
} from "app/controllers/company";
import { AuthMiddleware } from "app/middlewares";
import { Exception } from "app/exceptions";
import AuthSchema from "app/schemas/company/AuthSchema";
import RegistrationSchema from "app/schemas/company/RegistrationSchema";
import UpdatePasswordSchema from "app/schemas/company/UpdatePasswordSchema";
import ServiceSchema from "app/schemas/company/ServiceSchema";

const router = Router();

router.post('/registration', RegistrationSchema, Exception.asyncHandler(RegistrationController.saveCompany));
router.post('/login', AuthSchema, Exception.asyncHandler(AuthController.login));

router.use(AuthMiddleware.user);
router.get('/', AccountController.account);
router.post('/update_password', UpdatePasswordSchema, Exception.asyncHandler(AccountController.updatePassword));

router
  .get('/services', Exception.asyncHandler(ServiceController.list))
  .post('/services', ServiceSchema.create, Exception.asyncHandler(ServiceController.create))
  .delete('/services/:id', Exception.asyncHandler(ServiceController.delete));

export default router;