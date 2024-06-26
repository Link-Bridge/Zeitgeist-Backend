import { Request, Response } from 'express';
import { z } from 'zod';
import { AdminRoleService } from '../../core/app/services/admin-role.service';
import { CompanyService } from '../../core/app/services/company.service';
import { zodValidUuid } from '../validators/zod.validator';

/**
 * @brief variable para validar que el id sea un id valido
 */
const idSchema = z.object({
  id: z.string().uuid(),
});

const updateUserRoleSchema = z.object({
  userId: zodValidUuid,
  roleId: zodValidUuid,
});

/**
 * @brief update employee role
 *
 * @param req
 * @param res
 */
async function updateUserRole(req: Request, res: Response) {
  try {
    const { userId, roleId } = updateUserRoleSchema.parse(req.body);
    const employee = await AdminRoleService.updateUserRole(userId, roleId);

    res.status(200).json({ data: employee });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ message: error.message });
  }
}

/**
 * @brief Get all roles
 *
 * @param res
 */
async function getAllRoles(_: Request, res: Response) {
  try {
    const roles = await AdminRoleService.getAllRoles();
    res.status(200).json({ data: roles });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

/**
 * @brief archive a client
 *
 * @param req
 * @param res
 */
async function archiveClient(req: Request, res: Response) {
  try {
    const { id } = idSchema.parse({ id: req.params.id });
    const company = await CompanyService.archiveClient(id);
    res.status(200).json({ data: company });
  } catch (error: any) {
    res.status(500).json({ message: 'Internal server error occurred.' });
  }
}

export { archiveClient, getAllRoles, updateUserRole };
