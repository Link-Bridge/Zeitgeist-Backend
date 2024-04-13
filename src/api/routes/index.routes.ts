import { Router } from 'express';
import { AuthRouter } from './auth.routes';
import { DummyRouter } from './dummy.routes';
import { ProjectRouter } from './project.routes';

const baseRouter = Router();

const V1_PATH = '/api/v1';

baseRouter.use('/dummy', DummyRouter);
//Auth
baseRouter.use(`${V1_PATH}/auth`, AuthRouter);
//Project
baseRouter.use(`${V1_PATH}/project`, ProjectRouter);
// Health check
baseRouter.use(`${V1_PATH}/health`, (_req, res) => res.send('OK'));

export { baseRouter };
