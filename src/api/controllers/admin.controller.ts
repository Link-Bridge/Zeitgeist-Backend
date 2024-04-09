import { Request, Response } from 'express';

async function updateUserRol(req: Request, res: Response) {
    try {
        res.status(200).json({ data: null });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export { updateUserRol };