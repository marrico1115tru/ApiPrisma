import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

// Listar roles
router.get('/', async (req, res) => {
  try {
    const roles = await prisma.rol.findMany({
      include: { usuarios: true, accesos: true }
    })
    res.json(roles)
  } catch (error) {
    res.status(500).json({ error: 'Error al listar roles', detalles: error })
  }
})

// Crear rol
router.post('/', async (req, res) => {
  try {
    const nuevoRol = await prisma.rol.create({
      data: req.body
    })
    res.status(201).json(nuevoRol)
  } catch (error) {
    res.status(500).json({ error: 'Error al crear rol', detalles: error })
  }
})

// Editar rol
router.put('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const rol = await prisma.rol.update({
      where: { id: parseInt(id) },
      data: req.body
    })
    res.json(rol)
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar rol', detalles: error })
  }
})

// Eliminar rol
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    await prisma.rol.delete({ where: { id: parseInt(id) } })
    res.json({ mensaje: 'Rol eliminado correctamente' })
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar rol', detalles: error })
  }
})

export default router
