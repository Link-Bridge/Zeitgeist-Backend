import { Router } from 'express';
import { ProjectController } from '../controllers/project.controller';

const router = Router();

router.post('/create', ProjectController.createProject);
router.get('/report/:id', ProjectController.getReportData);
router.get('/', ProjectController.getAllProjects);

export { router as ProjectRouter };
