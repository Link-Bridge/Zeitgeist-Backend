import { Router } from 'express';
import { DummyRouter } from './dummy.routes';
import { AdminRouter } from './admin.routes';

const baseRouter = Router();

const V1_PATH = '/api/v1';

baseRouter.use('/dummy', DummyRouter);
baseRouter.use(`${V1_PATH}/admin`, AdminRouter);

export { baseRouter };
