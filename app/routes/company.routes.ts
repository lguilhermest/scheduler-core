import { Router } from "express";
import RegistrationSchema from "../schemas/company/RegistrationSchema";
import RegistrationController from "../controllers/company/RegistrationController";

const router = Router();

router.post('/registration', RegistrationSchema, RegistrationController.saveCompany);

export default router;