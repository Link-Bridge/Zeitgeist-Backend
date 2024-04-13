import { NextFunction, Request, Response } from 'express';
import admin from '../../config/firebase-admin.config';

declare global {
  namespace Express {
    interface Request {
      employee?: admin.auth.DecodedIdToken;
    }
  }
}

export const checkAuthToken = (req: Request, res: Response, next: NextFunction) => {
  const authToken = req.headers.authorization;
  if (!authToken || !authToken.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'User is not authorize' });
  }

  const token = authToken.split(' ')[1];
  admin
    .auth()
    .verifyIdToken(token)
    .then(decodedToken => {
      req.employee = decodedToken;
      next();
    })
    .catch(() => {
      res.status(403).json({ message: 'Expired or invalid token' });
    });
};
