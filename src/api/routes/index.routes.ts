import { Router } from 'express';
import { DummyRouter } from './dummy.routes';
import { AdminRouter } from './admin.routes';
import { ProjectRouter } from './project.routes';

const baseRouter = Router();

const V1_PATH = '/api/v1';

baseRouter.use('/dummy', DummyRouter);
baseRouter.use(`${V1_PATH}/admin`, AdminRouter);
baseRouter.use(`${V1_PATH}/project`, ProjectRouter);

export { baseRouter };
