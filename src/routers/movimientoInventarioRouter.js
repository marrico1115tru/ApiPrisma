// src/routers/movimientoInventarioRouter.js
import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// GET: obtener todos los movimientos
router.get('/', async (req, res) => {
  try {
    const movimientos = await prisma.movimientoInventario.findMany({
      include: {
        producto: true,
        usuario: true,
      },
      orderBy: {
        fechaMovimiento: 'desc',
      },
    });
    res.json(movimientos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener movimientos de inventario' });
  }
});

// GET: obtener un movimiento por id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const movimiento = await prisma.movimientoInventario.findUnique({
      where: { id: Number(id) },
      include: {
        producto: true,
        usuario: true,
      },
    });
    if (!movimiento) {
      return res.status(404).json({ error: 'Movimiento no encontrado' });
    }
    res.json(movimiento);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener movimiento' });
  }
});

// POST: crear un nuevo movimiento
router.post('/', async (req, res) => {
  const { productoId, usuarioId, tipoMovimiento, cantidad, observaciones } = req.body;

  if (!productoId || !usuarioId || !tipoMovimiento || !cantidad) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }
  if (!['entrada', 'salida'].includes(tipoMovimiento)) {
    return res.status(400).json({ error: 'tipoMovimiento debe ser "entrada" o "salida"' });
  }

  try {
    const nuevoMovimiento = await prisma.movimientoInventario.create({
      data: {
        productoId,
        usuarioId,
        tipoMovimiento,
        cantidad,
        observaciones,
      },
    });
    res.status(201).json(nuevoMovimiento);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear movimiento' });
  }
});

// PUT: actualizar un movimiento existente
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { productoId, usuarioId, tipoMovimiento, cantidad, observaciones } = req.body;

  try {
    const movimientoExistente = await prisma.movimientoInventario.findUnique({
      where: { id: Number(id) },
    });
    if (!movimientoExistente) {
      return res.status(404).json({ error: 'Movimiento no encontrado' });
    }

    if (tipoMovimiento && !['entrada', 'salida'].includes(tipoMovimiento)) {
      return res.status(400).json({ error: 'tipoMovimiento debe ser "entrada" o "salida"' });
    }

    const movimientoActualizado = await prisma.movimientoInventario.update({
      where: { id: Number(id) },
      data: {
        productoId,
        usuarioId,
        tipoMovimiento,
        cantidad,
        observaciones,
      },
    });

    res.json(movimientoActualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar movimiento' });
  }
});

// DELETE: eliminar un movimiento
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const movimientoExistente = await prisma.movimientoInventario.findUnique({
      where: { id: Number(id) },
    });
    if (!movimientoExistente) {
      return res.status(404).json({ error: 'Movimiento no encontrado' });
    }

    await prisma.movimientoInventario.delete({
      where: { id: Number(id) },
    });

    res.json({ message: 'Movimiento eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar movimiento' });
  }
});

export default router;
