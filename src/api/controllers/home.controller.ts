import { Request, Response } from 'express';
import { z } from 'zod';
import { HomeService } from '../../core/app/services/home.service';

const idSchema = z.object({
  id: z.string().uuid(),
});

/**
 * Controller to get home (my projects and clients)
 *
 * @param req
 * @param res
 */
async function getHome(req: Request, res: Response) {
  try {
    const { id } = idSchema.parse({ id: req.params.idEmployee });
    const data = await HomeService.getMyInfo(id);
    res.status(200).json({ data: data });
  } catch (error: any) {
    res.status(500).json({ message: 'Internal server error occurred.' });
  }
}

export const HomeController = { getHome };
