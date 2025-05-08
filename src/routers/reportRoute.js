// src/routes/reportes.ts
import { Router } from 'express';
import {
  getSolicitudesPorUsuario,
  getProductosPorVencer,
  getEntregasPorFicha,
} from '../controller/reportController.js';

const router = Router();

router.get('/solicitudes-por-usuario', getSolicitudesPorUsuario);
router.get('/productos-por-vencer', getProductosPorVencer);
router.get('/entregas-por-ficha', getEntregasPorFicha);

export default router;
