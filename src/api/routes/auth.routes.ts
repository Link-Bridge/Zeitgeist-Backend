import { NextFunction, Request, Response, Router } from 'express';
import { getDummyData } from '../controllers/dummy.controller';
import { checkAuthToken } from '../middlewares/auth.middleware';

const router = Router();

/**
 * @openapi
 * /create/employee:
 */
router.post(
  '/create/employee',
  (req: Request, res: Response, next: NextFunction) => checkAuthToken(req, res, next),
  getDummyData
);

export { router as AuthRouter };
