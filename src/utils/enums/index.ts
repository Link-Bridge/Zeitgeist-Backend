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

export enum ProjectStatus {
  IN_QUOTATION = 'IN QUOTATION',
  ACCEPTED = 'ACCEPTED',
  NOT_STARTED = 'NOT STARTED',
  IN_PROCESS = 'IN PROCESS',
  UNDER_REVISION = 'UNDER REVISION',
  UNDER_REVISSION = 'UNDER REVISSION',
  DELAYED = 'DELAYED',
  POSTPONED = 'POSTPONED',
  DONE = 'DONE',
  CANCELLED = 'CANCELLED',
}

export enum AllowedProjectStatus {}

export enum AllowedProjectCategory {}
