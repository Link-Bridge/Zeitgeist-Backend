import { Router } from 'express';
import { SupportedRoles } from '../../utils/enums';
import { EmployeeController } from '../controllers/employee.controller';
import { checkAuthRole } from '../middlewares/rbac.middleware';

const router = Router();

router.get('/', checkAuthRole([SupportedRoles.ADMIN]), EmployeeController.getAllEmployees);
router.get('/getAllEmployees', checkAuthRole([SupportedRoles.ADMIN]), EmployeeController.getAllEmployees);
router.post('/signup', EmployeeController.userExists);
router.delete('/delete/:id', checkAuthRole([SupportedRoles.ADMIN]), EmployeeController.deleteEmployee);

export { router as EmployeeRouter };
