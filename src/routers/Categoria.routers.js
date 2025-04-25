import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Obtener todas las categorías
router.get('/categoria', async (req, res) => {
  try {
    const categorias = await prisma.categoria.findMany();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las categorías' });
  }
});

// Crear una nueva categoría
router.post('/categoria', async (req, res) => {
  const { nombre, descripcion } = req.body;
  try {
    const nuevaCategoria = await prisma.categoria.create({
      data: {
        nombre,
        descripcion,
      },
    });
    res.status(201).json(nuevaCategoria);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la categoría' });
  }
});

// Actualizar una categoría existente
router.put('/categoria/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion } = req.body;
  try {
    const categoriaActualizada = await prisma.categoria.update({
      where: { id: parseInt(id) },
      data: { nombre, descripcion },
    });
    res.json(categoriaActualizada);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la categoría' });
  }
});

// Eliminar una categoría
router.delete('/categoria/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const categoriaEliminada = await prisma.categoria.delete({
      where: { id: parseInt(id) },
    });
    res.json(categoriaEliminada);
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la categoría' });
  }
});

export default router;
