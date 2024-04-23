import { Router } from 'express';
import { ProjectController } from '../controllers/project.controller';

const router = Router();

router.get('/report/:id', ProjectController.getReportData);

/*
 * @openapi
 * /project/{clientId}:
 *  get:
 *    summary: Get projects by client ID
 *    tags:
 *      - Project
 *    description: Retrieve a list of projects associated with a specific client.
 *    parameters:
 *      - in: path
 *        name: clientId
 *        schema:
 *          type: string
 *        required: true
 *        description: The ID of the client to retrieve projects for.
 *    responses:
 *      '200':
 *        description: A list of projects associated with the client ID.
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  projectId:
 *                    type: string
 *                    description: The ID of the project.
 *                    example: "f4105be8-3b4a-44bb-8707-d1e3eec927ba"
 *                  projectName:
 *                    type: string
 *                    description: The name of the project.
 *                    example: "Project A"
 */

router.get('/:clientId', ProjectController.getProjectsClient);

export { router as ProjectRouter };
