import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { verifyToken } from "../middlewares/verificarToken.js";

const router = Router();
const prisma = new PrismaClient();

// Obtener todas las bodegas
router.get("/Bodega", async (req, res) => {
  try {
    const bodegas = await prisma.bodega.findMany();
    res.json(bodegas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las bodegas." });
  }
});

// Crear nueva bodega
router.post("/Bodega", async (req, res) => {
  const { nombre } = req.body;

  if (!nombre || nombre.trim() === "") {
    return res.status(400).json({ error: "El campo 'nombre' es obligatorio." });
  }

  try {
    const nuevaBodega = await prisma.bodega.create({
      data: { nombre },
    });
    res.status(201).json(nuevaBodega);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la bodega." });
  }
});

// Eliminar bodega
router.delete("/Bodega/:id", verifyToken, async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const bodegaEliminada = await prisma.bodega.delete({
      where: { id },
    });
    res.json(bodegaEliminada);
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la bodega." });
  }
});

// Actualizar bodega
router.put("/Bodega/:id", verifyToken, async (req, res) => {
  const id = parseInt(req.params.id);
  const { nombre } = req.body;

  if (!nombre || nombre.trim() === "") {
    return res.status(400).json({ error: "El campo 'nombre' es obligatorio." });
  }

  try {
    const bodegaActualizada = await prisma.bodega.update({
      where: { id },
      data: { nombre },
    });
    res.json(bodegaActualizada);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la bodega." });
  }
});

export default router;
