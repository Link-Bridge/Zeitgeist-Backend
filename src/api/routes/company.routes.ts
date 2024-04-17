import { Router } from 'express';
import { CompanyController } from '../controllers/company.controller';

const router = Router();

router.get('/', CompanyController.getAll);
router.post('/new', CompanyController.create);

export { router as CompanyRouter };
