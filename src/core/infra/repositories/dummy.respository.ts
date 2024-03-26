import { randomUUID } from 'crypto';
import { Prisma } from '../../..';
import { Dummy } from '../../domain/entities/dummy.entity';
import { NotFoundError } from '../../errors/not-found.error';

// const RESOURCE_NAME = 'DummyInfo';

export class DummyRepository {
  /**
   * @brief Esta función es para obtener todos los registros de la entidad Dummy
   *
   * @description La funciones reciben un param y retornan una Entidad segun el modulo
   * 1. Encapsular todo en un try, catch
   * 2. Revisar si retorna información o no, en caso de no retornar nada, lanzar un error NotFoundError
   * 3. En caso de error inesperado, loguear el error y lanzar un error genérico o uno específico según tu caso de uso
   * @returns Promise<Dummy[]>
   */

  public async findAll(): Promise<Dummy[]> {
    try {
      /**
       * @warning El codigo de abajo es para Prisma. Asi lo vamos a usar
       */

      // const data = Prisma.Dummy.findMany();

      // if (!data) {
      //     throw new NotFoundError(RESOURCE_NAME)
      // }

      // return data;

      /**
       * @warning Esto solo es para que funcione por ahora
       */
      return Promise.resolve([
        {
          id: randomUUID(),
          name: 'Joe Doe',
        },
      ]);
    } catch (error: any) {
      if (error instanceof NotFoundError) {
        throw error;
      } else {
        // Loguear el error inesperado
        console.error(error);
        // Puedes lanzar un error genérico o uno específico según tu caso de uso
        throw new Error('An unexpected error occurred');
      }
    }
  }
}
