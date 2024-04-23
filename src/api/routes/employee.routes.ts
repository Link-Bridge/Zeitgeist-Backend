import { Router } from 'express';
import { EmployeeController } from '../controllers/employee.controller';
import { checkAuthToken } from '../middlewares/auth.middleware';

const router = Router();

router.post('/signup', checkAuthToken, EmployeeController.userExists);
router.post('/token/save', EmployeeController.saveToken);
router.get('/', checkAuthToken, EmployeeController.getAllEmployees);

export { router as EmployeeRouter };
