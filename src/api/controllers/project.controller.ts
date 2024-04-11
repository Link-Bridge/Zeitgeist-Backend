import { Request, Response } from 'express';
import { ProjectReportService } from '../../core/app/services/project-report.services';

async function getReportData(req: Request, res: Response) {
    try {
        const data = await ProjectReportService.getReport(req.params.id);
        res.status(200).json({ data: data });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const ProjectController = { getReportData };