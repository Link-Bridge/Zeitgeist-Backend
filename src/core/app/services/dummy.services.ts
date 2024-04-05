import { DummyRepository } from '../../infra/repositories/dummy.respository';

/**
 * @brief Una entidad cumple la función de ser un molde para los datos que se van a retornar
 *
 * @description La interfaz su usa para decir a la función que tipo de dato va a retornar
 * basicamente la interfaz es igual a la entidad Dummy solo si se interacuta con la entidad
 */
export interface DummyData {
  id: string;
  name: string;
}

export class DummyService {
  constructor(private readonly dummyRepository: DummyRepository = new DummyRepository()) {}

  /**
   * @brief Esta función es para obtener todos los registros de la entidad Dummy
   * @returns Promise<DummyData[]> - Retorna un array de objetos de tipo DummyData
   */
  public async getDummyData(): Promise<DummyData[]> {
    // No manejamos errores en este nivel, ya que el repositorio ya se encarga de manejarlos
    // En dado caso que se interactue con el provider, se debe manejar los errores
    return await this.dummyRepository.findAll();
  }
}
