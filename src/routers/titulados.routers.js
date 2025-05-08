import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

// Listar titulados
router.get('/', async (req, res) => {
  try {
    const titulados = await prisma.titulo.findMany({
      include: { fichasFormacion: true }
    })
    res.json(titulados)
  } catch (error) {
    res.status(500).json({ error: 'Error al listar titulados', detalles: error })
  }
})

// Crear titulado
router.post('/', async (req, res) => {
  try {
    const nuevoTitulado = await prisma.titulo.create({
      data: req.body
    })
    res.status(201).json(nuevoTitulado)
  } catch (error) {
    res.status(500).json({ error: 'Error al crear titulado', detalles: error })
  }
})

// Editar titulado
router.put('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const titulado = await prisma.titulo.update({
      where: { id: parseInt(id) },
      data: req.body
    })
    res.json(titulado)
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar titulado', detalles: error })
  }
})

// Eliminar titulado
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    await prisma.titulo.delete({ where: { id: parseInt(id) } })
    res.json({ mensaje: 'Titulado eliminado correctamente' })
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar titulado', detalles: error })
  }
})

export default router
