import { Router } from 'express';
import { CompanyController } from '../controllers/company.controller';

const router = Router();

/**
 * @openapi
 * /company/:id:
 *  get:
 *    summary: Obtiene información de una compañía específica por su ID
 *    tags:
 *      - Company
 *    description: Retorna información de una compañía específica identificada por su ID
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID de la compañía
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Información de la compañía
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: string
 *                  description: El ID de la compañía
 *                  example: "f4105be8-3b4a-44bb-8707-d1e3eec927ba"
 *
 */
router.get('/:id', CompanyController.getUnique);

/**
 * @opeanapi
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
router.get('/', CompanyController.getAll);

export { router as CompanyRouter };
