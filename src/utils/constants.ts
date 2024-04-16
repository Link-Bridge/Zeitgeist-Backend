export enum ExecutionEnv {
  /**
   * Execution environment where the application is serving real users.
   */
  PRODUCTION = 'production',

  /**
   * Execution environment where logging can be verbose to ease debugging.
   */
  DEVELOP = 'develop',
}

export enum EnvConfigKeys {
  HOST = 'HOST',
  PORT = 'PORT',
  DATABASE_URL = 'DATABASE_URL',
}
