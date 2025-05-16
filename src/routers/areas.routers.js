import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// GET /api/areas -> obtener todas las áreas
router.get("/", async (req, res) => {
  try {
    const areas = await prisma.area.findMany({
      include: {
        centroFormacion: true,
        sitio: true,
      },
    });
    res.json(areas);
  } catch (error) {
    console.error("Error al obtener áreas:", error);
    res.status(500).json({ error: "Error al obtener áreas" });
  }
});

// POST /api/areas -> crear área nueva
router.post("/", async (req, res) => {
  try {
    const { nombre, centroFormacionId, sitioId, fechaInicial, fechaFinal } = req.body;

    if (!nombre || !centroFormacionId || !sitioId) {
      return res.status(400).json({ error: "Faltan datos obligatorios: nombre, centroFormacionId, sitioId" });
    }

    const nuevaArea = await prisma.area.create({
      data: {
        nombre,
        centroFormacionId,
        sitioId,
        fechaInicial: fechaInicial ? new Date(fechaInicial) : undefined,
        fechaFinal: fechaFinal ? new Date(fechaFinal) : undefined,
      },
    });

    res.status(201).json(nuevaArea);
  } catch (error) {
    console.error("Error al crear área:", error);
    res.status(500).json({ error: "Error al crear área" });
  }
});

// PUT /api/areas/:id -> actualizar área
router.put("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

    const { nombre, centroFormacionId, sitioId, fechaInicial, fechaFinal } = req.body;

    const areaActualizada = await prisma.area.update({
      where: { id },
      data: {
        nombre,
        centroFormacionId,
        sitioId,
        fechaInicial: fechaInicial ? new Date(fechaInicial) : undefined,
        fechaFinal: fechaFinal ? new Date(fechaFinal) : undefined,
      },
    });

    res.json(areaActualizada);
  } catch (error) {
    console.error("Error al actualizar área:", error);
    res.status(500).json({ error: "Error al actualizar área" });
  }
});

// DELETE /api/areas/:id -> eliminar área
router.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

    await prisma.area.delete({ where: { id } });
    res.json({ mensaje: "Área eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar área:", error);
    res.status(500).json({ error: "Error al eliminar área" });
  }
});

export default router;
