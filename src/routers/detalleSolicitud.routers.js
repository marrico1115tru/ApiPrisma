import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

/* ============================
    RUTAS PARA SOLICITUDES
============================ */

// Listar todas las solicitudes
router.get('/solicitudes', async (req, res) => {
  try {
    const solicitudes = await prisma.solicitud.findMany({
      include: {
        usuarioSolicitante: true,
        detalles: true,
        entregas: true,
      },
    });
    res.json(solicitudes);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar solicitudes', detalles: error });
  }
});

// Obtener una solicitud por ID
router.get('/solicitudes/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    const solicitud = await prisma.solicitud.findUnique({
      where: { id },
      include: {
        usuarioSolicitante: true,
        detalles: true,
        entregas: true,
      },
    });
    if (!solicitud) return res.status(404).json({ error: 'Solicitud no encontrada' });
    res.json(solicitud);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener solicitud', detalles: error });
  }
});

// Crear una nueva solicitud
router.post('/solicitudes', async (req, res) => {
  const { usuarioSolicitanteId, fechaSolicitud, estadoSolicitud } = req.body;
  if (!usuarioSolicitanteId || !fechaSolicitud || !estadoSolicitud) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }
  try {
    const nuevaSolicitud = await prisma.solicitud.create({
      data: {
        usuarioSolicitanteId,
        fechaSolicitud: new Date(fechaSolicitud),
        estadoSolicitud,
      },
    });
    res.status(201).json(nuevaSolicitud);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear solicitud', detalles: error });
  }
});

// Actualizar una solicitud
router.put('/solicitudes/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { usuarioSolicitanteId, fechaSolicitud, estadoSolicitud } = req.body;
  try {
    const solicitudActualizada = await prisma.solicitud.update({
      where: { id },
      data: {
        usuarioSolicitanteId,
        fechaSolicitud: new Date(fechaSolicitud),
        estadoSolicitud,
      },
    });
    res.json(solicitudActualizada);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar solicitud', detalles: error });
  }
});

// Eliminar una solicitud
router.delete('/solicitudes/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    await prisma.solicitud.delete({ where: { id } });
    res.json({ mensaje: 'Solicitud eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar solicitud', detalles: error });
  }
});

/* ============================
    RUTAS PARA DETALLE SOLICITUD
============================ */

// Listar todos los detalles de solicitudes
router.get('/detalles-solicitud', async (req, res) => {
  try {
    const detalles = await prisma.detalleSolicitud.findMany({
      include: {
        solicitud: true,
        producto: true,
      },
    });
    res.json(detalles);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar detalles de solicitud', detalles: error });
  }
});
// ✅ Crear un nuevo detalle de solicitud
router.post('/', async (req, res) => {
  const { solicitudId, productoId, cantidadSolicitada, observaciones } = req.body;

  if (!solicitudId || !productoId || !cantidadSolicitada) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }

  try {
    const nuevoDetalle = await prisma.detalleSolicitud.create({
      data: {
        solicitudId,
        productoId,
        cantidadSolicitada,
        observaciones,
      },
    });
    res.status(201).json(nuevoDetalle);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el detalle de solicitud', detalles: error.message });
  }
});
// Eliminar un detalle de solicitud
router.delete('/detalles-solicitud/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    await prisma.detalleSolicitud.delete({ where: { id } });
    res.json({ mensaje: 'Detalle de solicitud eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar detalle de solicitud', detalles: error });
  }
});

export default router;
""