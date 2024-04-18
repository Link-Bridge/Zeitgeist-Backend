/**
 * @description Los enums que estan en diccionario de datos los pondremos como constantes aqui
 */

export enum AllowedGenders {}

export enum SupportedRoles {
  ADMIN = 'ADMINISTRADOR',
  LEGAL = 'LEGAL',
  CONTABLE = 'CONTABLE',
}

export enum SupportedDepartments {
  LEGAL = 'LEGAL',
  CONTABLE = 'CONTABLE',
}

export enum TaskStatus {
  NOT_STARTED = 'NOT STARTED',
  IN_PROGRESS = 'IN PROGRESS',
  UNDER_REVISSION = 'UNDER REVISSION',
  DELAYED = 'DELAYED',
  POSTPONED = 'POSTPONED',
  DONE = 'DONE',
  CANCELLED = 'CANCELLED',
  DEFAULT = '-',
}

export enum AllowedProjectStatus {}


export enum AllowedProjectCategory {}
