const ResendErrorCodes = {
  BadRequest: 400,
  Unauthorized: 401,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  Conflict: 409,
  TooManyRequests: 429,
  InternalServerError: 500,
};

const ResendErrorMessage = {
  [ResendErrorCodes.BadRequest]: 'The request was unacceptable, often due to missing a required parameter.',
  [ResendErrorCodes.Unauthorized]: 'No valid API key provided.',
  [ResendErrorCodes.Forbidden]: "The API key doesn't have permissions to perform the request.",
  [ResendErrorCodes.NotFound]: "The requested resource doesn't exist.",
  [ResendErrorCodes.MethodNotAllowed]: 'The HTTP method used is not allowed for the authenticated user.',
  [ResendErrorCodes.Conflict]:
    'The request could not be completed due to a conflict with the current state of the target resource.',
  [ResendErrorCodes.TooManyRequests]: 'Too many requests hit the API too quickly. We recommend spacing requests out.',
  [ResendErrorCodes.InternalServerError]: "Something went wrong on Resend's end.",
};

export class ResendErrorFactory {
  static createError(errorCode: number) {
    if (ResendErrorMessage[errorCode]) {
      return new Error(`Resend API Error: ${ResendErrorMessage[errorCode]}`);
    } else {
      return new Error('An unknown error occurred with the Resend API.');
    }
  }
}
