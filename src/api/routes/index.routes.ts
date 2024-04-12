import { Router } from 'express';
import { DummyRouter } from './dummy.routes';
import { CompanyRouter } from './company.routes';

const baseRouter = Router();

baseRouter.use('/dummy', DummyRouter);
baseRouter.use('/company', CompanyRouter);


export { baseRouter };
