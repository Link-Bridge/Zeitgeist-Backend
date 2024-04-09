import { Router } from 'express';
import { getReportData } from '../controllers/project.controller';

const router = Router();

router.get('/report/:id', getReportData);

export { router as ProjectRouter};