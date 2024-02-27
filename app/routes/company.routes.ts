import { Router } from "express";
import { Exception } from "../exceptions";
import RegistrationSchema from "../schemas/company/RegistrationSchema";
import RegistrationController from "../controllers/company/RegistrationController";
import AuthSchema from "../schemas/company/AuthSchema";
import AuthController from "../controllers/company/AuthController";
import { AuthMiddleware } from "../middlewares";

const router = Router();

router.post('/registration', RegistrationSchema, Exception.asyncHandler(RegistrationController.saveCompany));
router.post('/login', AuthSchema, Exception.asyncHandler(AuthController.login));

router.use(AuthMiddleware.user);

export default router;