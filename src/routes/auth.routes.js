import { Router } from 'express';
import { loginUsuario, validarCodigo } from '../controllers/auth.controller.js';

const router = Router();

router.post('/login', loginUsuario);
router.post('/validar-codigo', validarCodigo);

export default router;
