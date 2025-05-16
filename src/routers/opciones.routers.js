import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

// Listar opciones
router.get('/', async (req, res) => {
  try {
    const opciones = await prisma.opcion.findMany({
      include: { accesos: true }
    })
    res.json(opciones)
  } catch (error) {
    res.status(500).json({ error: 'Error al listar opciones', detalles: error })
  }
})

// Crear opción
router.post('/', async (req, res) => {
  try {
    const { nombre } = req.body;

    if (!nombre || typeof nombre !== 'string') {
      return res.status(400).json({ error: 'El nombre es obligatorio y debe ser una cadena.' });
    }

    const nuevaOpcion = await prisma.opcion.create({
      data: { nombre }, // solo se envía el campo necesario
    });

    res.status(201).json(nuevaOpcion);
  } catch (error) {
    console.error('Error al crear opción:', error);
    res.status(500).json({ error: 'Error al crear opción', detalles: error });
  }
});


// Editar opción
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;

  if (!nombre || typeof nombre !== 'string') {
    return res.status(400).json({ error: 'El nombre es obligatorio y debe ser una cadena.' });
  }

  try {
    const opcion = await prisma.opcion.update({
      where: { id: parseInt(id) },
      data: { nombre }, // solo se actualiza 'nombre'
    });

    res.json(opcion);
  } catch (error) {
    console.error('Error al actualizar opción:', error);
    res.status(500).json({ error: 'Error al actualizar opción', detalles: error });
  }
});


// Eliminar opción
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    await prisma.opcion.delete({ where: { id: parseInt(id) } })
    res.json({ mensaje: 'Opción eliminada correctamente' })
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar opción', detalles: error })
  }
})

export default router
