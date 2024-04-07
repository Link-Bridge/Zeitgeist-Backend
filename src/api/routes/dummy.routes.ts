import { Router } from 'express';
import { getDummyData } from '../controllers/dummy.controller';

const router = Router();

/**
 * @openapi
 * /dummy/data:
 *   get:
 *     summary: Obtiene datos dummy
 *     tags:
 *       - Dummy
 *     description: Retorna una lista de datos dummy.
 *     responses:
 *       200:
 *         description: Una lista de datos dummy
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: El ID del dato dummy
 *                     example: 1
 *                   name:
 *                     type: string
 *                     description: El nombre del dato dummy
 *                     example: "Dato Dummy"
 */
router.get('/data', getDummyData);

export { router as DummyRouter };
