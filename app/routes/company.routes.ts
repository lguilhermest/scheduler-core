import { Router } from "express";
import {
  AccountController,
  AuthController,
  RegistrationController,
  SchedulingController,
  ServiceController
} from "app/controllers/company";
import { AuthMiddleware } from "app/middlewares";
import { Exception } from "app/exceptions";
import AuthSchema from "app/schemas/company/AuthSchema";
import RegistrationSchema from "app/schemas/company/RegistrationSchema";
import UpdatePasswordSchema from "app/schemas/company/UpdatePasswordSchema";
import ServiceSchema from "app/schemas/company/ServiceSchema";
import schedulingSchema from "app/schemas/company/scheduling.schema";

const router = Router();

router.post('/registration', RegistrationSchema, Exception.asyncHandler(RegistrationController.saveCompany));
router.post('/login', AuthSchema, Exception.asyncHandler(AuthController.login));

router.use(AuthMiddleware.user);
router.get('/', AccountController.account);
router.post('/update_password', UpdatePasswordSchema, Exception.asyncHandler(AccountController.updatePassword));

router.route('services')
  .get(Exception.asyncHandler(ServiceController.list))
  .post(ServiceSchema.create, Exception.asyncHandler(ServiceController.create))

router.delete('/services/:id', Exception.asyncHandler(ServiceController.delete));

router.route('/schedulings')
  .get(Exception.asyncHandler(SchedulingController.list))
  .post(schedulingSchema.create, Exception.asyncHandler(SchedulingController.create))
  .put(Exception.asyncHandler(SchedulingController.update))

router.delete('/schedulings', Exception.asyncHandler(SchedulingController.delete))

export default router;