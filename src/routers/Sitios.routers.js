import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();


router.get('/', async (req, res) => {
  try {
    const sitios = await prisma.sitio.findMany({
      include: {
        tipoSitio: true, 
        areas: true,     
      },
    });
    res.json(sitios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los sitios' });
  }
});

// ✅ Obtener un Sitio por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const sitio = await prisma.sitio.findUnique({
      where: { id: Number(id) },
      include: { tipoSitio: true, areas: true },
    });
    if (!sitio) return res.status(404).json({ error: 'Sitio no encontrado' });
    res.json(sitio);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar el sitio' });
  }
});

// ✅ Crear un nuevo Sitio
router.post('/', async (req, res) => {
  const { nombre, ubicacion, tipoSitioId, activo } = req.body;
  try {
    const nuevoSitio = await prisma.sitio.create({
      data: {
        nombre,
        ubicacion,
        tipoSitioId,
        activo,
      },
    });
    res.status(201).json(nuevoSitio);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el sitio' });
  }
});

// ✅ Actualizar un Sitio
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, ubicacion, tipoSitioId, activo } = req.body;
  try {
    const sitioActualizado = await prisma.sitio.update({
      where: { id: Number(id) },
      data: {
        nombre,
        ubicacion,
        tipoSitioId,
        activo,
      },
    });
    res.json(sitioActualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el sitio' });
  }
});

// ✅ Eliminar un Sitio
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.sitio.delete({
      where: { id: Number(id) },
    });
    res.json({ message: 'Sitio eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el sitio' });
  }
});

export default router;
