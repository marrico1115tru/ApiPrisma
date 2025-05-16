import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

// Listar todos los movimientos de inventario con sus relaciones
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
    })
    res.json(movimientos)
  } catch (error) {
    res.status(500).json({ error: 'Error al listar movimientos', detalles: error })
  }
})

// Obtener movimiento por id
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id)
  try {
    const movimiento = await prisma.movimientoInventario.findUnique({
      where: { id },
      include: {
        producto: true,
        usuario: true,
      },
    })
    if (!movimiento) {
      return res.status(404).json({ error: 'Movimiento no encontrado' })
    }
    res.json(movimiento)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener movimiento', detalles: error })
  }
})

// Crear un nuevo movimiento
router.post('/', async (req, res) => {
  const { productoId, usuarioId, tipoMovimiento, cantidad, observaciones } = req.body
  if (!productoId || !usuarioId || !tipoMovimiento || !cantidad) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' })
  }
  if (!['entrada', 'salida'].includes(tipoMovimiento)) {
    return res.status(400).json({ error: 'tipoMovimiento debe ser "entrada" o "salida"' })
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
    })
    res.status(201).json(nuevoMovimiento)
  } catch (error) {
    res.status(500).json({ error: 'Error al crear movimiento', detalles: error })
  }
})

// Actualizar movimiento por id
router.put('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const { productoId, usuarioId, tipoMovimiento, cantidad, observaciones } = req.body
  try {
    if (tipoMovimiento && !['entrada', 'salida'].includes(tipoMovimiento)) {
      return res.status(400).json({ error: 'tipoMovimiento debe ser "entrada" o "salida"' })
    }
    const movimientoActualizado = await prisma.movimientoInventario.update({
      where: { id },
      data: {
        productoId,
        usuarioId,
        tipoMovimiento,
        cantidad,
        observaciones,
      },
    })
    res.json(movimientoActualizado)
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar movimiento', detalles: error })
  }
})

// Eliminar movimiento por id
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id)
  try {
    await prisma.movimientoInventario.delete({ where: { id } })
    res.json({ mensaje: 'Movimiento eliminado correctamente' })
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar movimiento', detalles: error })
  }
})

export default router
