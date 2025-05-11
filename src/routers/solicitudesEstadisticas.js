import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// 🟣 1. Solicitudes por mes
router.get('/por-mes', async (req, res) => {
  try {
    const data = await prisma.solicitud.groupBy({
      by: ['fechaSolicitud'],
      _count: true,
    });

    const response = data.map(item => ({
      mes: new Date(item.fechaSolicitud).toLocaleDateString('es-ES', {
        month: 'short',
        year: 'numeric',
      }),
      cantidad: item._count,
    }));

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener solicitudes por mes' });
  }
});

// 🔵 2. Estado de solicitudes
router.get('/estado', async (req, res) => {
  try {
    const data = await prisma.solicitud.groupBy({
      by: ['estadoSolicitud'],
      _count: true,
    });

    const response = data.map(item => ({
      nombre: item.estadoSolicitud,
      valor: item._count,
    }));

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener estado de solicitudes' });
  }
});

// 🟢 3. Tiempo promedio de entrega
router.get('/tiempo-entrega', async (req, res) => {
  try {
    const entregas = await prisma.entregaMaterial.findMany({
      include: { solicitud: true },
    });

    const tiemposPorMes = entregas.reduce((acc, entrega) => {
      const solicitud = entrega.solicitud;
      const mes = new Date(solicitud.fechaSolicitud).toLocaleDateString('es-ES', {
        month: 'short',
        year: 'numeric',
      });

      const dias = Math.ceil(
        (new Date(entrega.fechaEntrega).getTime() - new Date(solicitud.fechaSolicitud).getTime()) /
        (1000 * 60 * 60 * 24)
      );

      if (!acc[mes]) acc[mes] = [];
      acc[mes].push(dias);
      return acc;
    }, {}); // ✅ Corregido para JavaScript

    const response = Object.entries(tiemposPorMes).map(([mes, dias]) => ({
      mes,
      dias: Math.round(dias.reduce((a, b) => a + b, 0) / dias.length),
    }));

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Error al calcular el tiempo promedio de entrega' });
  }
});

// 🟡 4. Materiales más solicitados
router.get('/materiales-mas-solicitados', async (req, res) => {
  try {
    const top = await prisma.detalleSolicitud.groupBy({
      by: ['productoId'],
      _sum: { cantidadSolicitada: true },
      orderBy: { _sum: { cantidadSolicitada: 'desc' } },
      take: 5,
    });

    const productos = await prisma.producto.findMany({
      where: {
        id: { in: top.map(r => r.productoId) },
      },
    });

    const response = top.map(r => {
      const producto = productos.find(p => p.id === r.productoId);
      return {
        nombre: producto ? producto.nombre : 'Desconocido',
        cantidad: r._sum.cantidadSolicitada || 0,
      };
    });

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener materiales más solicitados' });
  }
});

export default router;
