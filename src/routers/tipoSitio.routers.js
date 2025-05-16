import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// ✅ Obtener todos los Tipos de Sitio
router.get('/', async (req, res) => {
  try {
    const tiposSitio = await prisma.tipoSitio.findMany({
      include: {
        sitios: true, // Incluye los sitios relacionados
      },
    });
    res.json(tiposSitio);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los tipos de sitio' });
  }
});

// ✅ Obtener un Tipo de Sitio por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const tipoSitio = await prisma.tipoSitio.findUnique({
      where: { id: Number(id) },
      include: { sitios: true },
    });
    if (!tipoSitio) return res.status(404).json({ error: 'Tipo de sitio no encontrado' });
    res.json(tipoSitio);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar el tipo de sitio' });
  }
});

// ✅ Crear un nuevo Tipo de Sitio
router.post('/', async (req, res) => {
  const { nombre } = req.body;
  try {
    const nuevoTipoSitio = await prisma.tipoSitio.create({
      data: {
        nombre,
      },
    });
    res.status(201).json(nuevoTipoSitio);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el tipo de sitio' });
  }
});

// ✅ Actualizar un Tipo de Sitio
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  try {
    const tipoSitioActualizado = await prisma.tipoSitio.update({
      where: { id: Number(id) },
      data: {
        nombre,
      },
    });
    res.json(tipoSitioActualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el tipo de sitio' });
  }
});

// ✅ Eliminar un Tipo de Sitio
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.tipoSitio.delete({
      where: { id: Number(id) },
    });
    res.json({ message: 'Tipo de sitio eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el tipo de sitio' });
  }
});

export default router;
