export enum SupportedRoles {
  WITHOUT_ROLE = 'No role',
  ADMIN = 'Admin',
  LEGAL = 'Legal',
  ACCOUNTING = 'Accounting',
}

export enum SupportedDepartments {
  WITHOUT_DEPARTMENT = 'Without department',
  LEGAL = 'Legal',
  ACCOUNTING = 'Accounting',
  LEGAL_AND_ACCOUNTING = 'Legal and accounting',
}

export enum TaskStatus {
  NOT_STARTED = 'Not started',
  IN_PROGRESS = 'In progress',
  UNDER_REVISSION = 'Under revision',
  DELAYED = 'Delayed',
  POSTPONED = 'Postponed',
  DONE = 'Done',
  CANCELLED = 'Cancelled',
  DEFAULT = '-',
}

export enum ProjectStatus {
  CANCELLED = 'Cancelled',
  NOT_STARTED = 'Not started',
  DELAYED = 'Delayed',
  IN_PROGRESS = 'In progress',
  ACCEPTED = 'Accepted',
  DONE = 'Done',
  POSTPONED = 'Postponed',
  IN_QUOTATION = 'In quotation',
  UNDER_REVISION = 'Under revision',
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

export enum ExpenseReportStatus {
  ACCEPTED = 'Accepted',
  PAYED = 'Payed',
  PENDING = 'Pending',
  REJECTED = 'Rejected',
}
