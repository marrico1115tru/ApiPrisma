import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Obtener todas las solicitudes
router.get('/', async (req, res) => {
  try {
    const data = await prisma.solicitud.findMany({
      include: {
        usuarioSolicitante: true,
        detalles: true,
        entregas: true,
      },
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las solicitudes' });
  }
});

// Crear una nueva solicitud
router.post('/', async (req, res) => {
  try {
    const data = await prisma.solicitud.create({
      data: req.body,
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la solicitud' });
  }
});

// Actualizar una solicitud
router.put('/:id', async (req, res) => {
  try {
    const data = await prisma.solicitud.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la solicitud' });
  }
});

// Eliminar una solicitud
router.delete('/:id', async (req, res) => {
  try {
    const data = await prisma.solicitud.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la solicitud' });
  }
});

// Nueva ruta: Obtener resumen de solicitudes por mes
router.get('/por-mes', async (req, res) => {
  try {
    const solicitudes = await prisma.solicitud.findMany({
      include: {
        entregas: true,
      },
    });

    const tiempos = solicitudes.map((e) => {
      const inicio = new Date(e.fechaSolicitud);
      const fin = new Date(e.fechaEntrega);
      const diffDias = Math.round((fin - inicio) / (1000 * 60 * 60 * 24));
      const mes = inicio.toLocaleString('default', { month: 'short' });
      return { mes, dias: diffDias };
    });

    const agrupado = tiempos.reduce((acc, curr) => {
      acc[curr.mes] = acc[curr.mes] || { total: 0, cantidad: 0 };
      acc[curr.mes].total += curr.dias;
      acc[curr.mes].cantidad += 1;
      return acc;
    }, {});

    const resultado = Object.entries(agrupado).map(([mes, val]) => ({
      mes,
      promedio: (val.total / val.cantidad).toFixed(2),
    }));

    res.json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al calcular solicitudes por mes' });
  }
});

export default router;
