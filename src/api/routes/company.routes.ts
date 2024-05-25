import { Router } from 'express';
import { SupportedRoles } from '../../utils/enums';
import { CompanyController } from '../controllers/company.controller';
import { checkAuthRole } from '../middlewares/rbac.middleware';

const router = Router();

router.use(checkAuthRole([SupportedRoles.ACCOUNTING, SupportedRoles.LEGAL, SupportedRoles.ADMIN]));
router.get('/', CompanyController.getAll);
router.get('/:id', CompanyController.getUnique);
router.post('/new', CompanyController.create);
router.put('/:id', CompanyController.updateClient);
router.delete('/delete/:id', CompanyController.deleteCompany);

export { router as CompanyRouter };
