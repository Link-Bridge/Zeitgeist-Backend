interface BaseErrorOptions {
  message?: string;
  errors?: ReadonlyArray<any>;
  code: string;
  inner?: Error;
}

/**
 * Represents an error that can be shown to a requesting client
 */
export abstract class BaseError<TErrors = any> extends Error {
  public readonly errors?: ReadonlyArray<TErrors>;
  public readonly code: string;
  public readonly inner?: Error;

  constructor(options: BaseErrorOptions) {
    const { code, errors, message, inner } = options;
    super(message);

    this.code = code;
    this.errors = errors;
    this.inner = inner;
  }
}
