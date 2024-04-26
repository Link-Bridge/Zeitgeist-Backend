import { Router } from 'express';
import { SupportedRoles } from '../../utils/enums';
import { CompanyController } from '../controllers/company.controller';
import { checkAuthToken } from '../middlewares/auth.middleware';
import { checkAuthRole } from '../middlewares/rbac.middleware';

const router = Router();

/**
 * @openapi
 * /company/:
 *  get:
 *    summary: Obtiene todas las compañías
 *    tags:
 *      - Company
 *    description: Retorna una lista de todas la compañías
 *    responses:
 *      200:
 *        description: Una lista de todas la compañías
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: string
 *                    description: El ID de la compañía
 *                    example: "f4105be8-3b4a-44bb-8707-d1e3eec927ba"
 */
router.get(
  '/',
  checkAuthToken,
  checkAuthRole([SupportedRoles.CONTABLE, SupportedRoles.LEGAL, SupportedRoles.ADMIN]),
  CompanyController.getAll
);

/**
 * @openapi
 * /company/:
 *  post:
 *    summary: Crea una nueva compañía
 *    tags:
 *      - Company
 *    description: Crea una nueva compañía
 *    responses:
 *      200:
 *        description: La compañía creada
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: string
 *                  description: El ID de la compañía
 *                  example: "f4105be8-3b4a-44bb-8707-d1e3eec927ba"
 */
router.post(
  '/new',
  checkAuthToken,
  checkAuthRole([SupportedRoles.CONTABLE, SupportedRoles.LEGAL, SupportedRoles.ADMIN]),
  CompanyController.create
);

export { router as CompanyRouter };
