import { Router } from 'express';
import { DummyRouter } from './dummy.routes';

const baseRouter = Router();

baseRouter.use('/dummy', DummyRouter);

export { baseRouter };
