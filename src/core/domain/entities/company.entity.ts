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

export interface Company {
  id: string;

  name: string;

  email: string | null;

  phone_number: string | null;

  landline_phone: string | null;

  archived: boolean;

  id_company_direct_contact: string | null;

  id_form: string | null;

  created_at: Date;

  updated_at: Date | null;
}
