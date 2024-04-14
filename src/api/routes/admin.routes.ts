import { Router } from 'express';
import { updateUserRol } from "../controllers/admin.controller";

const router = Router();

router.put("/role", updateUserRol);

export { router as AdminRouter };