/**
 * @description Los enums que estan en diccionario de datos los pondremos como constantes aqui
 */

export enum AllowedGenders {}

export enum SupportedRoles {}

export enum SupportedDepartments {
  LEGAL = 'LEGAL',
  CONTABLE = 'CONTABLE',
}

export enum AllowedProjectStatus {}

export enum ReportStatus {
  IN_QUOTATION = 'In quotation',
  WITHOUT_STATUS = '-',
  CANCELLED = 'Cancelled',
}

export enum ProjectCategory {
  CLIENT = 'Client',
  ZEITGEIST_INTERNAL = 'Zeitgeist internal',
  ACADEMIC_CONNECTION = 'Academic connection',
  GOVERNMENT = 'Government',
  SUPPLIER = 'Supplier',
  EVENT = 'Event',
  FAIRS_CONFERENCES = 'Fairs/Conferences',
  WITHOUT_CATEGORY = '-',
}

export enum ProjectPeriodicity {
  ONE_DAY = '1 day',
  ONE_WEEK = '1 week',
  TWO_WEEKS = '2 weeks',
  ONE_MONTH = '1 month',
  TWO_MONTHS = '2 months',
  FOUR_MONTHS = '4 months',
  SIX_MONTHS = '6 months',
  TWELVE_MONTHS = '12 months',
  WHEN_NEEDED = 'When needed',
}

export enum ProjectStatus {
  IN_QUOTATION = 'In quotation',
  ACCEPTED = 'Accepted',
  NOT_STARTED = 'Not started',
  IN_PROCESS = 'In process',
  UNDER_REVISION = 'Under revision',
  DELAYED = 'Delayed',
  POSTPONED = 'Postponed',
  DONE = 'Done',
  CANCELLED = 'Cancelled',
  WITHOUT_STATUS = '-',
}
