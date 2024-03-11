import { Router } from 'express';
import { DummyController } from '../controllers/dummy.controller'; // Asegúrate de que la ruta sea correcta
import { DummyRouter } from './dummy.routes';

// Crea un router base para agrupar todos los routers de módulos
const baseRouter = Router();

// Instancia el router y también el controlador
const dummyRouter = new DummyRouter(new DummyController()).router;

// Monta el router de Dummy en una ruta base específica
baseRouter.use('/dummy', dummyRouter);
// Monta otros routers aquí de ser necesario

// Exporta el router base
export default baseRouter;
