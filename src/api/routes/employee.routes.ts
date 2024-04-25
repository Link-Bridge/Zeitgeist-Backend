import { Router } from 'express';
import { EmployeeController } from '../controllers/employee.controller';
import { checkAuthToken } from '../middlewares/auth.middleware';

const router = Router();

router.post('/signup', checkAuthToken, EmployeeController.userExists);
router.get('/', EmployeeController.getAllEmployees);
router.delete('/delete/:id', EmployeeController.deleteEmployee);

export { router as EmployeeRouter };
