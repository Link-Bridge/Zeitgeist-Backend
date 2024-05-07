import { Request, Response } from 'express';
import { z } from 'zod';
import { ProjectReportService } from '../../core/app/services/project-report.service';
import { ProjectService } from '../../core/app/services/project.service';
import { ProjectCategory, ProjectPeriodicity, ProjectStatus, SupportedDepartments } from '../../utils/enums';

const idSchema = z.object({
  id: z.string().uuid(),
});

const createProjectRequestSchema = z.object({
  name: z.string(),
  idCompany: z.string().uuid({ message: 'Please provide valid UUID' }),
  category: z.nativeEnum(ProjectCategory),
  matter: z.string().optional(),
  description: z.string().optional(),
  status: z.nativeEnum(ProjectStatus),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().nullable(),
  periodicity: z.nativeEnum(ProjectPeriodicity),
  isChargeable: z.boolean(),
  area: z.nativeEnum(SupportedDepartments),
});

const reportRequestSchema = z.object({
  date: z.coerce.date(),
});

/**
 * @description Create a new project
 * @param req
 * @param res
 */
async function createProject(req: Request, res: Response) {
  try {
    const data = createProjectRequestSchema.parse(req.body);
    const newProject = await ProjectService.createProject({
      name: data.name,
      matter: data.matter || null,
      description: data.description || null,
      area: data.area,
      status: data.status,
      category: data.category,
      endDate: data.endDate || null,
      idCompany: data.idCompany,
      isChargeable: data.isChargeable,
      periodicity: data.periodicity,
      startDate: data.startDate,
    });
    res.status(201).json(newProject);
  } catch (error: unknown) {
    console.error(error);
    res.status(400).json({ message: error });
  }
}

/**
 * @description get a project report
 * @param req
 * @param res
 */
async function getReportData(req: Request, res: Response) {
  try {
    const { id } = idSchema.parse({ id: req.params.id });
    let data;

    if (req.query.date) {
      const { date } = reportRequestSchema.parse({ date: req.query.date });
      data = await ProjectReportService.getReport(id, date);
    } else {
      data = await ProjectReportService.getReport(id);
    }

    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

/**
 * @param {Request} req - The request object containing the clientID.
 * @param {Response} res
 *
 * @returns {Promise<void>}
 *
 * @throws {Error}
 */

async function getProjectsClient(req: Request, res: Response) {
  try {
    const data = await ProjectService.findProjectsClient(req.params.clientId);
    res.status(200).json({ data });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

/**
 * A function that calls the service to get all projects in the database.
 * @param req HTTP Request
 * @param res Server response
 */
async function getAllProjects(req: Request, res: Response) {
  try {
    const data = await ProjectService.getAllProjects();
    res.status(200).json({ data: data });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

/**
 * A function that handles the request to obtain project details by its id
 * @param req HTTP Request
 * @param res Server response
 */
async function getProjectById(req: Request, res: Response) {
  try {
    const { id } = idSchema.parse({ id: req.params.id });
    const projectDetails = await ProjectService.getProjectById(id);
    if (projectDetails) {
      res.status(200).json(projectDetails);
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

/**
 * Recives a request to update a project data
 * @param req HTTP Request
 * @param res Server response
 */
async function updateProject(req: Request, res: Response) {
  try {
    const projectData = req.body;
    const updatedProject = await ProjectService.updateProject(projectData);
    res.status(200).json({ data: updatedProject });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

/**
 * A function that updates a project status
 * @param req HTTP Request
 * @param res Server response
 */
async function updateProjectStatus(req: Request, res: Response) {
  try {
    const { id } = idSchema.parse({ id: req.params.id });
    const { status } = req.body;
    await ProjectService.updateProjectStatus(id, status);
    res.status(200).json({ message: 'Project status updated' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export const ProjectController = {
  getReportData,
  createProject,
  getAllProjects,
  getProjectsClient,
  getProjectById,
  updateProject,
  updateProjectStatus,
};
