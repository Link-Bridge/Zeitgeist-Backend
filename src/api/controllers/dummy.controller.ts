import { Request, Response } from 'express';
import { DummyService } from '../../core/app/services/dummy.services';
import { DummyRepository } from '../../core/infra/repositories/dummy.respository';

export class DummyController {
  private readonly dummyService: DummyService;
  constructor() {
    // Aquí se inyecta el repositorio al servicio
    this.dummyService = new DummyService(new DummyRepository());
  }

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
