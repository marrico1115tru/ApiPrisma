import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Obtener todos los centros de formación
router.get("/CentroFormacion", async (req, res) => {
  try {
    const data = await prisma.centroFormacion.findMany();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener centros de formación" });
  }
});

// Crear un nuevo centro de formación
router.post("/CentroFormacion", async (req, res) => {
  try {
    const data = await prisma.centroFormacion.create({ data: req.body });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error al crear centro de formación" });
  }
});

// Actualizar un centro de formación por ID
router.put("/CentroFormacion/:id", async (req, res) => {
  try {
    const data = await prisma.centroFormacion.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar centro de formación" });
  }
});

// Eliminar un centro de formación por ID
router.delete("/CentroFormacion/:id", async (req, res) => {
  try {
    const data = await prisma.centroFormacion.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar centro de formación" });
  }
});


export default router;
