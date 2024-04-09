import { Request, Response } from 'express';
import { getReport } from '../../core/app/services/project_report.services';

async function getReportData(req: Request, res: Response) {
    try {
        const data = await getReport(req.params.id);
        res.status(200).json({ data: data });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export { getReportData };