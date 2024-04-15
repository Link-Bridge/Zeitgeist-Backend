import { Router } from 'express';
import { EmployeeController } from '../controllers/employee.controller';
import { checkAuthToken } from '../middlewares/auth.middleware';

const router = Router();

router.post('/create', checkAuthToken, EmployeeController.createUser);
router.get('/exists/:email', checkAuthToken, EmployeeController.userExists);

export { router as EmployeeRouter };
