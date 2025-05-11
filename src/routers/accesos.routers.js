import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Obtener todos los accesos
router.get("/", async (req, res) => {
  try {
    const accesos = await prisma.acceso.findMany({
      include: {
        opcion: true,
        rol: true,
      },
    });
    res.json(accesos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los accesos" });
  }
});

// Crear un acceso
router.post("/", async (req, res) => {
  try {
    const nuevoAcceso = await prisma.acceso.create({
      data: req.body,
    });
    res.json(nuevoAcceso);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el acceso" });
  }
});

// Actualizar un acceso
router.put("/:id", async (req, res) => {
  try {
    const accesoActualizado = await prisma.acceso.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.json(accesoActualizado);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el acceso" });
  }
});

// Eliminar un acceso
router.delete("/:id", async (req, res) => {
  try {
    const accesoEliminado = await prisma.acceso.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json(accesoEliminado);
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el acceso" });
  }
});

export default router;
