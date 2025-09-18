import { Router } from 'express';
import { getMenu } from '../controllers/menu.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', authMiddleware, getMenu);

export default router;
