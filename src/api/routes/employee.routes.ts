import { Router } from 'express';
import { EmployeeController } from '../controllers/employee.controller';

const router = Router();

router.delete('delete/:id', EmployeeController.deleteEmployee);

export { router as EmployeeRouter };