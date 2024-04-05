import { Router } from 'express';
import { DummyController } from '../controllers/dummy.controller'; // Asegúrate de que la ruta sea correcta

export class DummyRouter {
  public router: Router;

  constructor(private dummyController: DummyController = new DummyController()) {
    this.router = Router();
    this.initializeRoutes();
  }

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

  private initializeRoutes(): void {
    this.router.get('/data', (req, res) => this.dummyController.getDummyData(req, res));
  }
}
