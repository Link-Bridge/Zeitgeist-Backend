import { Router } from 'express';
import { DummyRouter } from './dummy.routes';
import { AdminRouter } from './admin.routes';
import { EmployeeRouter } from './employee.routes';
import { ProjectRouter } from './project.routes';
import { TaskRouter } from './task.routes';

const baseRouter = Router();

const V1_PATH = '/api/v1';

baseRouter.use('/dummy', DummyRouter);

//Auth
baseRouter.use(`${V1_PATH}/admin`, AdminRouter);

// Employee
baseRouter.use(`${V1_PATH}/employee`, EmployeeRouter);

//Project
baseRouter.use(`${V1_PATH}/project`, ProjectRouter);

// Tasks
baseRouter.use(`${V1_PATH}/tasks`, TaskRouter);

// Health check
baseRouter.use(`${V1_PATH}/health`, (_req, res) => res.send('OK'));

export { baseRouter };
