import { Request, Response } from 'express';

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

        // TODO: connect with service

        res.status(200).json({ data: null });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export { updateUserRol };