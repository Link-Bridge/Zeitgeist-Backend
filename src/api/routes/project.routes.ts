import { Router } from 'express';
import { SupportedRoles } from '../../utils/enums';
import { ProjectController } from '../controllers/project.controller';
import { checkAuthRole } from '../middlewares/rbac.middleware';

const router = Router();

router.use(checkAuthRole([SupportedRoles.ACCOUNTING, SupportedRoles.LEGAL, SupportedRoles.ADMIN]));
router.get('/', ProjectController.getDepartmentProjects);
router.get('/details/:id', ProjectController.getProjectById);
router.get('/report/:id', ProjectController.getReportData);
router.get('/:clientId', ProjectController.getProjectsClient);
router.post('/create', ProjectController.createProject);
router.put('/edit/:id', ProjectController.updateProject);
router.put('/details/:id', ProjectController.updateProjectStatus);

export { router as ProjectRouter };
