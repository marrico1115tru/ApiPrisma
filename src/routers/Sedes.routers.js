import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Obtener todas las sedes
router.get("/", async (req, res) => {
  try {
    const sedes = await prisma.sede.findMany();
    res.json(sedes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener sedes" });
  }
});

// Obtener una sede por id
router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const sede = await prisma.sede.findUnique({
      where: { id },
    });
    if (!sede) return res.status(404).json({ error: "Sede no encontrada" });
    res.json(sede);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la sede" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newSede = await prisma.sede.create({
      data: req.body,
    });
    res.status(201).json(newSede);
  } catch (error) {
    console.error(error);  // <-- imprime error en consola
    res.status(500).json({ error: "Error al crear la sede", details: error.message });
  }
});


// Actualizar una sede existente
router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const updatedSede = await prisma.sede.update({
      where: { id },
      data: req.body,
    });
    res.json(updatedSede);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar la sede" });
  }
});

// Eliminar una sede
router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.sede.delete({
      where: { id },
    });
    res.json({ message: "Sede eliminada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar la sede" });
  }
});

export default router;
