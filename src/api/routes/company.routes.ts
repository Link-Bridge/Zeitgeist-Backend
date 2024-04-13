import { Router } from 'express';
import { CompanyController } from '../controllers/company.controller';

const router = Router();

router.get('/', CompanyController.getAll);

export { router as CompanyRouter };
