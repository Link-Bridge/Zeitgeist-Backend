import { Router } from 'express';
import { SupportedRoles } from '../../utils/enums';
import { EmployeeController } from '../controllers/employee.controller';
import { checkAuthRole } from '../middlewares/rbac.middleware';

const router = Router();

router.post('/signup', EmployeeController.userExists);

router.use(checkAuthRole([SupportedRoles.ADMIN]));
router.get('/', EmployeeController.getAllEmployees);
router.get('/getAllEmployees', EmployeeController.getAllEmployees);
router.delete('/delete/:id', EmployeeController.deleteEmployee);

export { router as EmployeeRouter };
