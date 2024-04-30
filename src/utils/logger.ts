import { NextFunction, Request, Response } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
  console.info(`[${req.method.toUpperCase()}]: ${req.path}`);
  next();
}
