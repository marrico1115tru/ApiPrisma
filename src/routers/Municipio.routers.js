import { PrismaClient } from '@prisma/client'
import express from 'express'

const router = express.Router()
const prisma = new PrismaClient()

// Listar municipios
router.get('/', async (req, res) => {
  try {
    const municipios = await prisma.municipio.findMany({
      include: {
        centroFormacion: true, // asegúrate que esta relación exista en el schema
      },
    })
    res.json(municipios)
  } catch (error) {
    console.error('Error al buscar municipios:', error)
    res.status(500).json({ error: 'Error al buscar municipios' })
  }
})

// Crear municipio
router.post('/', async (req, res) => {
  try {
    const { nombre, departamento, centroFormacionId, fechaInicial, fechaFinal } = req.body

    const nuevoMunicipio = await prisma.municipio.create({
      data: {
        nombre,
        departamento,
        centroFormacionId,
        fechaInicial: new Date(fechaInicial),
        fechaFinal: new Date(fechaFinal),
      },
    })

    res.json(nuevoMunicipio)
  } catch (error) {
    console.error('Error al crear municipio:', error)
    res.status(500).json({ error: 'Error al crear municipio' })
  }
})

// Editar municipio
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { nombre, departamento, centroFormacionId, fechaInicial, fechaFinal } = req.body

    const municipioActualizado = await prisma.municipio.update({
      where: { id: Number(id) },
      data: {
        nombre,
        departamento,
        centroFormacionId,
        fechaInicial: new Date(fechaInicial),
        fechaFinal: new Date(fechaFinal),
      },
    })

    res.json(municipioActualizado)
  } catch (error) {
    console.error('Error al actualizar municipio:', error)
    res.status(500).json({ error: 'Error al actualizar municipio' })
  }
})

// Eliminar municipio
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params

    await prisma.municipio.delete({
      where: { id: Number(id) },
    })

    res.json({ message: 'Municipio eliminado' })
  } catch (error) {
    console.error('Error al eliminar municipio:', error)
    res.status(500).json({ error: 'Error al eliminar municipio' })
  }
})

export default router
