// routes/categoria.routes.js
import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { verifyToken } from "../middlewares/verificarToken.js";

const router = Router();
const prisma = new PrismaClient();

// Obtener todas las categorías
router.get("/categoria", async (req, res) => {
  const categorias = await prisma.categoria.findMany();
  res.json(categorias);
});

// Crear nueva categoría
router.post("/categoria", async (req, res) => {
  try {
    const nuevaCategoria = await prisma.categoria.create({
      data: req.body,
    });
    res.json(nuevaCategoria);
  } catch (error) {
    res.status(400).json({ error: "Error al crear categoría", details: error });
  }
});

// Actualizar categoría
router.put("/categoria/:id", async (req, res) => {
  try {
    const categoriaActualizada = await prisma.categoria.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.json(categoriaActualizada);
  } catch (error) {
    res.status(400).json({ error: "Error al actualizar categoría", details: error });
  }
});

// Eliminar categoría
router.delete("/categoria/:id",  async (req, res) => {
  try {
    const categoriaEliminada = await prisma.categoria.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json(categoriaEliminada);
  } catch (error) {
    res.status(400).json({ error: "Error al eliminar categoría", details: error });
  }
});

export default router;
