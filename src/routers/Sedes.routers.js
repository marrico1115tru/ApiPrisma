import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

/* ==============================
        LISTAR TODAS LAS SEDES
============================== */
router.get('/', async (req, res) => {
  try {
    const sedes = await prisma.sede.findMany({
      include: {
        area: true,
        centro: true,
      },
      orderBy: {
        id: 'asc',
      },
    });
    res.json(sedes);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar las sedes', detalles: error.message });
  }
});

/* ==============================
        OBTENER SEDE POR ID
============================== */
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    const sede = await prisma.sede.findUnique({
      where: { id },
      include: {
        area: true,
        centro: true,
      },
    });
    if (!sede) {
      return res.status(404).json({ error: 'Sede no encontrada' });
    }
    res.json(sede);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la sede', detalles: error.message });
  }
});

/* ==============================
        CREAR UNA NUEVA SEDE
============================== */
router.post('/', async (req, res) => {
  const { nombre, ubicacion, areaId, centroId, fechaInicial, fechaFinal } = req.body;

  // Validación
  if (!nombre || !ubicacion || !areaId || !centroId) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }

  try {
    const nuevaSede = await prisma.sede.create({
      data: {
        nombre,
        ubicacion,
        areaId,
        centroId,
        fechaInicial: fechaInicial ? new Date(fechaInicial) : undefined,
        fechaFinal: fechaFinal ? new Date(fechaFinal) : undefined,
      },
    });
    res.status(201).json(nuevaSede);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la sede', detalles: error.message });
  }
});

/* ==============================
        ACTUALIZAR UNA SEDE
============================== */
router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { nombre, ubicacion, areaId, centroId, fechaInicial, fechaFinal } = req.body;

  // Validación
  if (!nombre || !ubicacion || !areaId || !centroId) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }

  try {
    const sedeActualizada = await prisma.sede.update({
      where: { id },
      data: {
        nombre,
        ubicacion,
        areaId,
        centroId,
        fechaInicial: fechaInicial ? new Date(fechaInicial) : undefined,
        fechaFinal: fechaFinal ? new Date(fechaFinal) : undefined,
      },
    });
    res.json(sedeActualizada);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la sede', detalles: error.message });
  }
});

/* ==============================
        ELIMINAR UNA SEDE
============================== */
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    await prisma.sede.delete({
      where: { id },
    });
    res.json({ mensaje: 'Sede eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la sede', detalles: error.message });
  }
});

export default router;
