/**
 * @brief Esta clase es para establecer la estructura de la entidad company
 *
 * @param id: string
 * @param name: string
 * @param email: string
 * @param phoneNumber: string
 * @param landlinePhone: string
 * @param archived: boolean
 * @param idCompanyDirectContact: string
 * @param idForm: string
 * @param createdAt: Date
 * @param updatedAt: Date
 *
 * @return void
 *
 * @description La estructura basicamente es lo que esta en el MER,
 * se tiene la idea usar tipos de datos personalizados, como UUID.
 */

export interface CompanyEntity {
  id: string;
  name: string;
  email: string | null;
  phoneNumber: string | null;
  landlinePhone: string | null;
  archived: boolean;
  idCompanyDirectContact: string | null;
  idForm: string | null;
  createdAt: Date;
  updatedAt: Date | null;
}
