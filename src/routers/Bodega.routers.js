import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { verifyToken } from "../middlewares/verificarToken.js";

const router = Router();
const prisma = new PrismaClient();

// Obtener todas las bodegas
router.get("/Bodega", async (req, res) => {
  try {
    const bodegas = await prisma.bodega.findMany({
      select: {
        id: true,
        nombre: true,
        ubicacion: true,
        fecha_registro: true,
        productos: true,
      },
    });
    res.json(bodegas);
  } catch (error) {
    console.error("Error al obtener las bodegas:", error);
    res.status(500).json({ error: "Error al obtener las bodegas." });
  }
});

// Crear nueva bodega
router.post("/Bodega", async (req, res) => {
  const { nombre, ubicacion } = req.body;

  if (!nombre || nombre.trim() === "" || !ubicacion || ubicacion.trim() === "") {
    return res.status(400).json({ error: "Los campos 'nombre' y 'ubicacion' son obligatorios." });
  }

  try {
    const nuevaBodega = await prisma.bodega.create({
      data: {
        nombre,
        ubicacion,
      },
    });
    res.status(201).json(nuevaBodega);
  } catch (error) {
    console.error("Error al crear la bodega:", error);
    res.status(500).json({ error: "Error al crear la bodega." });
  }
});

// Eliminar bodega
router.delete("/Bodega/:id",  async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const bodegaEliminada = await prisma.bodega.delete({
      where: { id },
    });
    res.json(bodegaEliminada);
  } catch (error) {
    console.error("Error al eliminar la bodega:", error);
    res.status(500).json({ error: "Error al eliminar la bodega." });
  }
});

// Actualizar bodega
router.put("/Bodega/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { nombre, ubicacion } = req.body;

  if (!nombre || nombre.trim() === "" || !ubicacion || ubicacion.trim() === "") {
    return res.status(400).json({ error: "Los campos 'nombre' y 'ubicacion' son obligatorios." });
  }

  try {
    const bodegaActualizada = await prisma.bodega.update({
      where: { id },
      data: {
        nombre,
        ubicacion,
      },
    });
    res.json(bodegaActualizada);
  } catch (error) {
    console.error("Error al actualizar la bodega:", error);
    res.status(500).json({ error: "Error al actualizar la bodega." });
  }
});

export default router;
