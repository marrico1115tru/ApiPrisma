import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

function parseDate(dateStr) {
  const date = new Date(dateStr);
  return isNaN(date) ? null : date;
}

// Crear solicitud con detalles
router.post('/', async (req, res) => {
  const {
    usuarioSolicitanteId,
    fechaSolicitud,
    estadoSolicitud,
    fechaInicial,
    fechaFinal,
    detalles,
  } = req.body;

  if (!usuarioSolicitanteId || !estadoSolicitud || !fechaSolicitud || !fechaInicial || !fechaFinal) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }

  const fechaSolicitudParsed = parseDate(fechaSolicitud);
  const fechaInicialParsed = parseDate(fechaInicial);
  const fechaFinalParsed = parseDate(fechaFinal);

  if (!fechaSolicitudParsed || !fechaInicialParsed || !fechaFinalParsed) {
    return res.status(400).json({ error: 'Fechas inválidas' });
  }

  try {
    const nuevaSolicitud = await prisma.solicitud.create({
      data: {
        usuarioSolicitanteId,
        fechaSolicitud: fechaSolicitudParsed,
        estadoSolicitud,
        fechaInicial: fechaInicialParsed,
        fechaFinal: fechaFinalParsed,
        detalles: detalles && detalles.length > 0
          ? {
              create: detalles.map(detalle => {
                return {
                  productoId: detalle.productoId,
                  cantidadSolicitada: detalle.cantidadSolicitada,
                  observaciones: detalle.observaciones || '',
                  fechaInicial: parseDate(detalle.fechaInicial) || new Date(),
                  fechaFinal: parseDate(detalle.fechaFinal) || new Date(),
                };
              }),
            }
          : undefined,
      },
      include: {
        detalles: true,
      },
    });

    res.status(201).json(nuevaSolicitud);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la solicitud' });
  }
});

// Listar todas las solicitudes con detalles
router.get('/', async (req, res) => {
  try {
    const solicitudes = await prisma.solicitud.findMany({
      include: {
        detalles: true,
      },
    });
    res.json(solicitudes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al listar solicitudes' });
  }
});

// Obtener solicitud por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const solicitud = await prisma.solicitud.findUnique({
      where: { id: Number(id) },
      include: { detalles: true },
    });
    if (!solicitud) return res.status(404).json({ error: 'Solicitud no encontrada' });
    res.json(solicitud);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener solicitud' });
  }
});

// Actualizar solicitud (sin actualizar detalles para simplificar)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {
    usuarioSolicitanteId,
    fechaSolicitud,
    estadoSolicitud,
    fechaInicial,
    fechaFinal,
  } = req.body;

  try {
    const solicitudActualizada = await prisma.solicitud.update({
      where: { id: Number(id) },
      data: {
        usuarioSolicitanteId,
        fechaSolicitud: parseDate(fechaSolicitud),
        estadoSolicitud,
        fechaInicial: parseDate(fechaInicial),
        fechaFinal: parseDate(fechaFinal),
      },
    });
    res.json(solicitudActualizada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar solicitud' });
  }
});

// Eliminar solicitud y sus detalles
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.detalleSolicitud.deleteMany({
      where: { solicitudId: Number(id) },
    });
    await prisma.solicitud.delete({
      where: { id: Number(id) },
    });
    res.json({ message: 'Solicitud eliminada' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar solicitud' });
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
