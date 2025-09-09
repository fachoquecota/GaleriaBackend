import { Router } from 'express';
import {
  getAllEjemplo,
  getEjemploById,
  createEjemplo,
  updateEjemplo,
  deleteEjemplo
} from '../controllers/ejemplo.controller.js';

const router = Router();

router.get('/', getAllEjemplo);
router.get('/:id', getEjemploById);
router.post('/', createEjemplo);
router.put('/:id', updateEjemplo);
router.delete('/:id', deleteEjemplo);

export default router;
