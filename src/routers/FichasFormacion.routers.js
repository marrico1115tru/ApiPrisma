import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// ✅ Obtener todas las fichas
router.get('/', async (req, res) => {
  try {
    const fichas = await prisma.fichaFormacion.findMany({
      include: { titulo: true, usuarios: true },
    });
    res.json(fichas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las fichas' });
  }
});

// ✅ Obtener una ficha por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const ficha = await prisma.fichaFormacion.findUnique({
      where: { id: Number(id) },
      include: { titulo: true, usuarios: true },
    });
    if (!ficha) return res.status(404).json({ error: 'Ficha no encontrada' });
    res.json(ficha);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar la ficha' });
  }
});

// ✅ Crear una nueva ficha
router.post('/', async (req, res) => {
  const { nombre, tituloId, fechaInicial, fechaFinal } = req.body;
  try {
    const nuevaFicha = await prisma.fichaFormacion.create({
      data: {
        nombre,
        tituloId,
        fechaInicial: new Date(fechaInicial),
        fechaFinal: new Date(fechaFinal),
      },
    });
    res.status(201).json(nuevaFicha);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la ficha' });
  }
});

// ✅ Actualizar una ficha por ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, tituloId, fechaInicial, fechaFinal } = req.body;
  try {
    const ficha = await prisma.fichaFormacion.update({
      where: { id: Number(id) },
      data: {
        nombre,
        tituloId,
        fechaInicial: new Date(fechaInicial),
        fechaFinal: new Date(fechaFinal),
      },
    });
    res.json(ficha);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la ficha' });
  }
});


router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });

  try {
    const exists = await prisma.fichaFormacion.findUnique({ where: { id } });
    if (!exists) {
      return res.status(404).json({ error: 'Ficha no encontrada' });
    }

    await prisma.fichaFormacion.delete({ where: { id } });

    res.json({ message: 'Ficha eliminada correctamente' });
  } catch (error) {
    console.error('Error eliminando ficha:', error);

    // Validar error por clave foránea (relaciones existentes)
    if (error.code === 'P2003') {
      return res.status(404).json({
        error: 'No se puede eliminar la ficha porque está relacionada con otros registros.',
      });
    }

    res.status(500).json({ error: 'Error al eliminar la ficha.' });
  }
});


export default router;
