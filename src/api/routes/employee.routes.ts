import { Router } from 'express';
import { SupportedRoles } from '../../utils/enums';
import { EmployeeController } from '../controllers/employee.controller';
import { checkAuthRole } from '../middlewares/rbac.middleware';

const router = Router();

router.post('/signup', EmployeeController.userExists);
router.get('/', checkAuthRole([SupportedRoles.ADMIN]), EmployeeController.getAllEmployees);
router.delete('/delete/:id', checkAuthRole([SupportedRoles.ADMIN]), EmployeeController.deleteEmployee);
router.get('/getAllEmployees', checkAuthRole([SupportedRoles.ADMIN]), EmployeeController.getAllEmployees);

export { router as EmployeeRouter };
