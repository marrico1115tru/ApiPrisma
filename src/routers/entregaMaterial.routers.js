import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

// GET - Listar todas las entregas de material
router.get('/', async (req, res) => {
  try {
    const entregas = await prisma.entregaMaterial.findMany({
      include: {
        solicitud: true,
        usuarioResponsable: true,
      },
    });
    res.json(entregas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET - Obtener una entrega por ID
router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const entrega = await prisma.entregaMaterial.findUnique({
      where: { id },
      include: {
        solicitud: true,
        usuarioResponsable: true,
      },
    });
    if (!entrega) return res.status(404).json({ error: 'Entrega no encontrada' });
    res.json(entrega);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST - Crear una nueva entrega de material
router.post('/', async (req, res) => {
  const { solicitudId, usuarioResponsableId, fechaEntrega, observaciones, fechaInicial, fechaFinal } = req.body;
  try {
    const nuevaEntrega = await prisma.entregaMaterial.create({
      data: {
        solicitudId,
        usuarioResponsableId,
        fechaEntrega: new Date(fechaEntrega),
        observaciones,
        fechaInicial: fechaInicial ? new Date(fechaInicial) : undefined,
        fechaFinal: fechaFinal ? new Date(fechaFinal) : undefined,
      },
    });
    res.status(201).json(nuevaEntrega);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT - Actualizar una entrega existente
router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { solicitudId, usuarioResponsableId, fechaEntrega, observaciones, fechaInicial, fechaFinal } = req.body;
  try {
    const entregaActualizada = await prisma.entregaMaterial.update({
      where: { id },
      data: {
        solicitudId,
        usuarioResponsableId,
        fechaEntrega: fechaEntrega ? new Date(fechaEntrega) : undefined,
        observaciones,
        fechaInicial: fechaInicial ? new Date(fechaInicial) : undefined,
        fechaFinal: fechaFinal ? new Date(fechaFinal) : undefined,
      },
    });
    res.json(entregaActualizada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE - Eliminar una entrega por ID
router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.entregaMaterial.delete({ where: { id } });
    res.json({ message: 'Entrega eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
