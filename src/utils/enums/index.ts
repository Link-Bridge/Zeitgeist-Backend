export enum SupportedRoles {
  WITHOUT_ROLE = 'SIN_ROL',
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
  IN_QUOTATION = 'In Quotation',
  ACCEPTED = 'Accepted',
  NOT_STARTED = 'Not Started',
  IN_PROCESS = 'In Process',
  UNDER_REVISION = 'Under Revision',
  UNDER_REVISSION = 'Under Reviision',
  DELAYED = 'Delayed',
  POSTPONED = 'Postponed',
  DONE = 'Done',
  CANCELLED = 'Cancelled',
  DEFAULT = '-',
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

export enum AllowedProjectStatus {}

export enum AllowedProjectCategory {}
