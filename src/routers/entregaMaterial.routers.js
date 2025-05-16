import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Listar todas las entregas
router.get('/', async (req, res) => {
  try {
    const entregas = await prisma.entregaMaterial.findMany();
    res.json(entregas);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar entregas', detalles: error.message });
  }
});

// Obtener una entrega por ID
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    const entrega = await prisma.entregaMaterial.findUnique({ where: { id } });
    if (!entrega) return res.status(404).json({ error: 'Entrega no encontrada' });
    res.json(entrega);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener entrega', detalles: error.message });
  }
});

// Crear nueva entrega
router.post('/', async (req, res) => {
  const { solicitudId, usuarioResponsableId, fechaEntrega, observaciones } = req.body;
  if (!solicitudId || !usuarioResponsableId || !fechaEntrega) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }
  try {
    const nuevaEntrega = await prisma.entregaMaterial.create({
      data: {
        solicitudId,
        usuarioResponsableId,
        fechaEntrega: new Date(fechaEntrega),
        observaciones,
      },
    });
    res.status(201).json(nuevaEntrega);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear entrega', detalles: error.message });
  }
});

// Actualizar entrega
router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { solicitudId, usuarioResponsableId, fechaEntrega, observaciones } = req.body;
  try {
    const entregaActualizada = await prisma.entregaMaterial.update({
      where: { id },
      data: {
        solicitudId,
        usuarioResponsableId,
        fechaEntrega: new Date(fechaEntrega),
        observaciones,
      },
    });
    res.json(entregaActualizada);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar entrega', detalles: error.message });
  }
});

// Eliminar entrega
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    await prisma.entregaMaterial.delete({ where: { id } });
    res.json({ mensaje: 'Entrega eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar entrega', detalles: error.message });
  }
});

export default router;
