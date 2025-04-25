import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { verifyToken } from "../middlewares/verificarToken.js";

const router = Router();
const prisma = new PrismaClient();

// Obtener todas las áreas con nombre del centro de formación
router.get('/Areas', async (req, res) => {
  try {
    const areas = await prisma.areas.findMany({
      include: {
        centro_formacion: {
          select: {
            nombre: true,
            id: true
          }
        }
      }
    });
    res.json(areas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las áreas', detalle: error.message });
  }
});

// Ruta específica para datos de gráfica: nombre_area + nombre del centro de formación
router.get('/AreasGrafica', async (req, res) => {
  try {
    const areas = await prisma.areas.findMany({
      include: {
        centro_formacion: {
          select: { nombre: true }
        }
      }
    });

    const datosGrafica = areas.map(area => ({
      nombre_area: area.nombre_area,
      nombre_centro_formacion: area.centro_formacion?.nombre || "No asignado"
    }));

    res.json(datosGrafica);
  } catch (error) {
    res.status(500).json({ error: 'Error al generar datos para la gráfica', detalle: error.message });
  }
});

// Crear nueva área
router.post('/Areas', async (req, res) => {
  try {
    const { nombre_area, id_centro_formacion } = req.body;

    // Verificar si el centro de formación existe
    const centro = await prisma.centroFormacion.findUnique({
      where: { id: id_centro_formacion }
    });

    if (!centro) {
      return res.status(400).json({ error: 'Centro de formación no encontrado' });
    }

    const nuevaArea = await prisma.areas.create({
      data: { nombre_area, id_centro_formacion }
    });

    res.status(201).json(nuevaArea);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear área', detalle: error.message });
  }
});

// Actualizar área
router.put('/Areas/:id',  async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_area, id_centro_formacion } = req.body;

    const areaExistente = await prisma.areas.findUnique({
      where: { id: parseInt(id) }
    });

    if (!areaExistente) {
      return res.status(404).json({ error: 'Área no encontrada' });
    }

    const areaActualizada = await prisma.areas.update({
      where: { id: parseInt(id) },
      data: { nombre_area, id_centro_formacion }
    });

    res.json(areaActualizada);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar área', detalle: error.message });
  }
});

// Eliminar área
router.delete('/Areas/:id',  async (req, res) => {
  try {
    const { id } = req.params;

    const areaExistente = await prisma.areas.findUnique({
      where: { id: parseInt(id) }
    });

    if (!areaExistente) {
      return res.status(404).json({ error: 'Área no encontrada' });
    }

    const areaEliminada = await prisma.areas.delete({
      where: { id: parseInt(id) }
    });

    res.json(areaEliminada);
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar área', detalle: error.message });
  }
});

export default router;
