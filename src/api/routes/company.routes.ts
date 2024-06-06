import { Router } from 'express';
import { SupportedRoles } from '../../utils/enums';
import { CompanyController } from '../controllers/company.controller';
import { checkAuthRole } from '../middlewares/rbac.middleware';

const router = Router();

router.use(checkAuthRole([SupportedRoles.ACCOUNTING, SupportedRoles.LEGAL, SupportedRoles.ADMIN]));
router.get('/', CompanyController.getAll);
router.get('/unarchived', CompanyController.getUnarchived);
router.get('/:id', CompanyController.getUnique);
router.post('/new', CompanyController.create);
router.put('/:id', CompanyController.updateClient);

export { router as CompanyRouter };
