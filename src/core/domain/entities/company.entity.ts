/**
 * @brief Esta clase establece la estructura de la entidad Project
 *
 * @param id: string
 * @param name: string
 * @param email: string
 * @param phoneNumber: string
 * @param landlinePhone: string
 * @param archived: Boolean
 * @param createdAt: Date
 * @param updatedAt: Date
 * @param idCompanyDirectContact: string
 * @param idForm: string
 *
 * @return void
 *
 * @description La estructura contiene los datos del esquema de Company,
 * pero se identifican como atributos opcionales aquellos que no
 * son requeridos por una compañia.
 * 
 */

export interface Company {
    /**
     * @param id: string - Identificador único de la compañia
     */
    id: string;
  
    /**
     * @param name: string - Nombre de la compañia
     */
    name: string;
      
    /**
     * @param email: string - Correo electronico de la compañia
     */
    email?: string | null;
      
    /**
     * @param phone_number: string - Celular de contacto de la compañia
     */
    phoneNumber?: string | null;
  
    /**
     * @param landline_phone: string - Telefono fijo de la compañia
     */
    landlinePhone?: string | null;
  
    /**
     * @param archived: Boolean - Indica si la compañia esta archivada o no
     */
    archived: Boolean;
  
    /**
     * @param created_at: Date - Fecha de registro de la tarea
     */
    createdAt: Date;

    /**
     * @param updated_at: Date - Última fecha de modificación
     */

    updatedAt?: Date;
  
    /**
     * @param id_company_direct_contact: string - Persona de contacto con Zeitgeist designada por la compañia
     */
    idCompanyDirectContact?: string | null;
  
    /**
     * @param id_form: string - Identificador único del formulario de la compañia
     */
    idForm?: string | null;
  
  }



