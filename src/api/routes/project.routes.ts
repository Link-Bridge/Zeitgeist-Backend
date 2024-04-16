import { Router } from 'express';
import { ProjectController } from '../controllers/project.controller';

const router = Router();

router.get('/report/:id', ProjectController.getReportData);

export { router as ProjectRouter };
