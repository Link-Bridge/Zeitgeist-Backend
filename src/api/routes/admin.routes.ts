import { Router } from 'express';
import { updateUserRol } from "../controllers/admin.controller";

const router = Router();

router.put("/rol", updateUserRol);

export { router as AdminRouter };