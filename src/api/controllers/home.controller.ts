import { Request, Response } from 'express';
import { HomeService } from '../../core/app/services/home.service';
/**
 * Controller to get home (my projects and clients)
 *
 * @param req
 * @param res
 */
async function getHome(req: Request, res: Response) {
  try {
    const data = await HomeService.getMyInfo(req.params.idEmployee);
    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json({ message: 'Internal server error occurred.' });
  }
}

export const HomeController = { getHome };
