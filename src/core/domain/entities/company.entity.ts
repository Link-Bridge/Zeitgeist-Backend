import { Decimal } from '@prisma/client/runtime/library';
/**
 * @brief This class is used to define the company entity
 *
 * @param id: string - Unique identifier of the company.
 * @param name: string - Company title
 * @param email: string - Company email
 * @param phoneNumber: string - Company phone number
 * @param landlinePhone: string - Company landline phone number
 * @param archived: boolean - Determines whether the company is archived or not
 * @param constitutionDate - Daate - Company constitution date
 * @param rfc - string - Company RFC from Mexico
 * @param taxResidence - string - Company Tax Residence
 * @param idCompanyDirectContact: string - Id for company direct contact
 * @param idForm: string - Id for company form
 * @param createdAt: Date - Company creation date
 * @param updatedAt: Date - Company update date
 * @param accountingHours: Decimal - Company accounting worked hours
 * @param legalHours: Decimal - Company legal worked hours
 * @param chargeableHours: Decimal - Company chargeable hours
 * @param totalProjects: number - Company total projects
 *
 * @return void
 *
 * @description The structure is based in the MER
 */

export interface CompanyEntity {
  id: string;
  /**
   * @param name: string - Company title
   */
  name: string;
  /**
   * @param email: string - Company email
   */
  email?: string | null;
  /**
   * @param phoneNumber: string - Company phone number
   */
  phoneNumber?: string | null;
  /**
   * @param landlinePhone: string - Company landline phone number
   */
  landlinePhone?: string | null;
  /**
   * @param archived: boolean - Determines whether the company is archived or not
   */
  archived?: boolean;
  /**
   * @param constitutionDate - Daate - Company constitution date
   */
  constitutionDate?: Date | null;
  /**
   * @param rfc - string - Company RFC from Mexico
   */
  rfc?: string | null;
  /**
   * @param taxResidence - string - Company Tax Residence
   */
  taxResidence?: string | null;
  /**
   * @param idCompanyDirectContact: string - Id for company direct contact
   */
  idCompanyDirectContact?: string | null;
  /**
   * @param idForm: string - Id for company form
   */
  idForm?: string | null;
  /**
   * @param createdAt: Date - Company creation date
   */
  createdAt: Date;
  /**
   * @param updatedAt: Date - Company update date
   */
  updatedAt: Date | null;
  /**
   * @param accountingHours: Decimal - Company accounting worked hours
   */
  accountingHours?: Decimal;
  /**
   * @param legalHours?: Decimal - Company legal worked hours
   */
  legalHours?: Decimal;
  /**
   * @param chargeableHours?: Decimal - Company chargeable hours
   */
  chargeableHours?: Decimal;
  /**
   * @param totalProjects?: number - Company total projects
   */
  totalProjects?: number;
}
