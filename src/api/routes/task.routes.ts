import { Router } from 'express';
import { TaskController } from '../controllers/task.controller';

const router = Router();

router.post('/create', TaskController.createTask);

export { router as TaskRouter };
