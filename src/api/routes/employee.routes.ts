import { Router } from 'express';
import { EmployeeController } from '../controllers/employee.controller';
import { checkAuthToken } from '../middlewares/auth.middleware';

const router = Router();

/**
 * @openapi
 * /create/employee:
 */
router.post('/create', checkAuthToken, EmployeeController.createUser);

export { router as EmployeeRouter };
