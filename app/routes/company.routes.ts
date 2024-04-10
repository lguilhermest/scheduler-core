import { Router } from "express";
import { AuthMiddleware } from "app/middlewares";
import {
  AccountController,
  AuthController,
  RegistrationController,
  SchedulingController,
  ServiceController
} from "app/controllers/company";
import {
  AuthSchema,
  RegistrationSchema,
  CreateSchedulingSchema,
  ChangePasswordSchema,
  CreateServiceSchema,
  SaveWorkingTimeSchema
} from "app/schemas/company";
import ErrorHandler from "app/ErrorHandler";
import { AddressSchema } from "app/schemas";

const router = Router();

router.post('/registration', RegistrationSchema, AddressSchema, ErrorHandler.asyncHandler(RegistrationController.saveCompany));
router.post('/login', AuthSchema, ErrorHandler.asyncHandler(AuthController.login));

router.use(AuthMiddleware.user);
router.get('/', ErrorHandler.asyncHandler(AccountController.account));
router.post('/update_password', ChangePasswordSchema, ErrorHandler.asyncHandler(AccountController.changePassword));
router.post('/working_hours', SaveWorkingTimeSchema, ErrorHandler.asyncHandler(AccountController.saveWorkingTime));

router.route('/services')
  .get(ErrorHandler.asyncHandler(ServiceController.list))
  .post(CreateServiceSchema, ErrorHandler.asyncHandler(ServiceController.create))

router.delete('/services/:id', ErrorHandler.asyncHandler(ServiceController.delete));

router.route('/schedulings')
  .get(ErrorHandler.asyncHandler(SchedulingController.list))
  .post(CreateSchedulingSchema, ErrorHandler.asyncHandler(SchedulingController.create))
  .put(ErrorHandler.asyncHandler(SchedulingController.update))

router.delete('/schedulings/:id', ErrorHandler.asyncHandler(SchedulingController.delete))

export default router;