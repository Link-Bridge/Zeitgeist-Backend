import { Request, Response } from 'express';
import { updateUserRole as updateUserRoleService } from '../../core/app/services/admin-role.services';

interface UpdateUserRoleBody {
  userId?: string;
  roleId?: string;
}

async function updateUserRole(req: Request, res: Response) {
  try {
    const { userId, roleId }: UpdateUserRoleBody = req.body;

    if (userId === undefined) {
      throw new Error('User id is undefined');
    }
    if (roleId === undefined) {
      throw new Error('Role id is undefined');
    }
    if (userId.trim() === '') {
      throw new Error('User id is undefined');
    }
    if (roleId.trim() === '') {
      throw new Error('Role id is undefined');
    }

    // Connect with service
    const employee = await updateUserRoleService(userId, roleId);
    res.status(200).json({ data: employee });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export { updateUserRole as updateUserRole };
