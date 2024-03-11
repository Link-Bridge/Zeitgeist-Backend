/**
 * @brief Esta clase es para establecer la estructura de la entidad Dummy
 *
 * @param id: number
 * @param name: string
 *
 * @return void
 *
 * @description La estructura basicamente es lo que esta en el MER,
 * usar tipos de datos primitivos (number, string, boolean, etc)
 */

export class Dummy {
  constructor(
    public id: number,
    public name: string
  ) {}
}
