/**
 * @brief Esta clase establece la estructura de la entidad Notification
 *
 * @param id: string
 * @param title: string
 * @param body: string
 * @param createdAt: Date
 * @param updatedAt: Date
 *
 * @return void
 *
 * @description La estructura contiene los datos del esquema Notification
 * 
 */


export interface Notification {
    /**
     * @param id: string - Identificador único de la notificación
     */
    id: string;
  
    /**
     * @param title: string - Titulo de la notificación
     */
    title: string;
  
    /**
     * @param body: string - Cuerpo de la notificación
     */
    body: string;
  
    /**
     * @param createdAt: Date - Fecha de registro de la notificación
     */
    createdAt: Date;
  
    /**
     * @param updatedAt: Date - Última fecha de modificación
     */
    updatedAt?: Date;
  }