import { Router } from 'express';
import { getDummyData } from '../controllers/dummy.controller';

const router = Router();

router.get('/data', getDummyData);

export { router as DummyRouter };
