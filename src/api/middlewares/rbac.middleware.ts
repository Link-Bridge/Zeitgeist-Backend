import { NextFunction, Request, Response } from 'express';
import { SupportedRoles } from '../../utils/enums';
import { EmployeeService } from '../../core/app/services/employee.services';

async function checkRole(req: Request, res: Response, next: NextFunction, allowedRoles: SupportedRoles[]) {
  const role = await EmployeeService.findRoleByEmail(req.body.auth.email);
  if (!allowedRoles.includes(role)) {
    return res.status(403).json({ message: 'User is not authorized' });
  }
}

export const checkAuthRole = (allowedRoles: SupportedRoles[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await checkRole(req, res, next, allowedRoles);
    next();
  };
}
