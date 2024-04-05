import { Request, Response } from 'express';
import { DummyService } from '../../core/app/services/dummy.services';

export class DummyController {
  constructor(private readonly dummyService: DummyService = new DummyService()) {}

  public async getDummyData(req: Request, res: Response) {
    try {
      const data = await this.dummyService.getDummyData();
      res.status(200).json({ data });
    } catch (error: any) {
      // TODO: Crear estandar
      res.status(500).json({ message: error.message });
    }
  }
}
