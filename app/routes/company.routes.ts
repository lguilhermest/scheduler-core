import { AuthMiddleware } from "app/middlewares";
import {
  AccountController,
  AuthController,
  EmployeeController,
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
  SaveWorkingTimeSchema,
  SaveEmployeeSchema
} from "app/schemas/company";
import { AddressSchema } from "app/schemas";
import { body } from "express-validator";
import Router from "./router";

const router = new Router();

router.post('/registration', RegistrationSchema, AddressSchema, RegistrationController.saveCompany);
router.post('/login', AuthSchema, AuthController.login);

router.use(AuthMiddleware.user);
router.get('/', AccountController.account);
router.post('/send_verification_code', AccountController.sendVerificationEmail);
router.post('/confirm_email', body('code').isString(), AccountController.confirmEmail);

router.post('/working_hours', SaveWorkingTimeSchema, AccountController.saveWorkingTime);
router.post('/update_password', ChangePasswordSchema, AccountController.changePassword);

router.post('/employees', SaveEmployeeSchema, EmployeeController.save);

router.get('/services', ServiceController.list);
router.post('/services', CreateServiceSchema, ServiceController.create);
router.delete('/services/:id', ServiceController.delete);

router.get('/schedulings', SchedulingController.list);
router.post('/schedulings', CreateSchedulingSchema, SchedulingController.create);
router.put('/schedulings', SchedulingController.update);
router.delete('/schedulings/:id', SchedulingController.delete);

export default router.getRouter();