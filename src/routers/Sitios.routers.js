import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Listar todos los sitios
router.get('/', async (req, res) => {
  try {
    const sitios = await prisma.sitio.findMany();
    res.json(sitios);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar sitios', detalles: error.message });
  }
});

// Crear un sitio
router.post('/', async (req, res) => {
  const { nombre, ubicacion, tipoSitioId, fechaInicial, fechaFinal, activo } = req.body;
  if (!nombre || !ubicacion || !tipoSitioId) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }
  try {
    const nuevoSitio = await prisma.sitio.create({
      data: {
        nombre,
        ubicacion,
        tipoSitioId,
        fechaInicial: fechaInicial ? new Date(fechaInicial) : new Date(),
        fechaFinal: fechaFinal ? new Date(fechaFinal) : new Date(),
        activo: activo ?? true,
      },
    });
    res.status(201).json(nuevoSitio);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear sitio', detalles: error.message });
  }
});

// Actualizar un sitio por id
router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { nombre, ubicacion, tipoSitioId, fechaInicial, fechaFinal, activo } = req.body;
  try {
    const sitioActualizado = await prisma.sitio.update({
      where: { id },
      data: {
        nombre,
        ubicacion,
        tipoSitioId,
        fechaInicial: fechaInicial ? new Date(fechaInicial) : undefined,
        fechaFinal: fechaFinal ? new Date(fechaFinal) : undefined,
        activo,
      },
    });
    res.json(sitioActualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar sitio', detalles: error.message });
  }
});

// Eliminar un sitio por id
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    await prisma.sitio.delete({ where: { id } });
    res.json({ mensaje: 'Sitio eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar sitio', detalles: error.message });
  }
});

export default router;
