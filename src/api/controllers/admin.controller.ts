import { Request, Response } from 'express';
import { updateUserRol as updateUserRolService } from "../../core/app/services/admin-rol.services";

interface IUpdateUserRolBody {
    userId?: string
    roleId?: string
}

async function updateUserRol(req: Request, res: Response) {
    try {
        const { userId, roleId }: IUpdateUserRolBody = req.body;

        if (userId === undefined) {
            throw new Error("User id is undefined");
        };
        if (roleId === undefined) {
            throw new Error("Role id is undefined");
        };
        if (userId.trim() === "") {
            throw new Error("User id is undefined");
        };
        if (roleId.trim() === "") {
            throw new Error("Role id is undefined");
        };

        // Connect with service
        const employee = await updateUserRolService(userId, roleId);
        res.status(200).json({ data: employee });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export { updateUserRol };