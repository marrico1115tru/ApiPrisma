import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/reportes/solicitudes-por-usuario', async (req, res) => {
  try {
    const data = await prisma.usuarios.findMany({
      select: {
        nombre: true,
        apellido: true,
        solicitudes: {
          select: {
            fecha_solicitud: true,
            estado_solicitud: true,
            detalle_solicitud: {
              select: {
                cantidad_solicitada: true,
                productos: {
                  select: {
                    nombre: true,
                    categoria: true
                  }
                }
              }
            }
          }
        }
      }
    });
    res.json(data);
  } catch (error) {
    console.error('Error al generar reporte:', error);
    res.status(500).json({ error: 'Error al generar reporte' });
  }
});

export default router;
