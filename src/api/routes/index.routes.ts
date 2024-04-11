import { Router } from 'express';
import { AuthRouter } from './auth.routes';
import { DummyRouter } from './dummy.routes';

const baseRouter = Router();

baseRouter.use('/dummy', DummyRouter);
baseRouter.use('/auth', AuthRouter);

// Health check
baseRouter.use('/health', (_req, res) => res.send('OK'));

export { baseRouter };
