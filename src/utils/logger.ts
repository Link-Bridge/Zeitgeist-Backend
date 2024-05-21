import chalk from 'chalk';
import { NextFunction, Request, Response } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
  console.info(`${formattedMethod(req.method)}: ${req.path}`);
  next();
}

function formattedMethod(method: string) {
  switch (method) {
    case 'GET':
      return chalk.bold.blue(`[${method.toUpperCase()}]`);
    case 'POST':
      return chalk.bold.green(`[${method.toUpperCase()}]`);
    case 'DELETE':
      return chalk.bold.red(`[${method.toUpperCase()}]`);
    case 'PUT':
    case 'PATCH':
      return chalk.bold.yellow(`[${method.toUpperCase()}]`);
  }
}
