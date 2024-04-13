import { Router } from 'express';
import { EmployeeController } from '../controllers/employee.controller';
import { checkAuthToken } from '../middlewares/auth.middleware';

const router = Router();

/**
 * @openapi
 * /create/employee:
 */
router.post('/create/employee', checkAuthToken, EmployeeController.createUser);

export { router as AuthRouter };
