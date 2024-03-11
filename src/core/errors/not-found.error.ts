import { BaseError } from './core/base-error.error';
import { BaseErrorCode } from './core/error-code.enum';

/**
 * Este error va a ser estandar para cuando un recurso no se encuentre
 * Invocarlo con throw new NotFoundError('resourceName')
 * En caso de no pasar el parametro resourceName, se usará 'resource'
 * @example throw new NotFoundError('User')
 */

export class NotFoundError extends BaseError {
  constructor(resourceName = 'resource') {
    super({
      code: BaseErrorCode.NOT_FOUND,
      message: `Requested ${resourceName} was not found`,
    });
  }
}
