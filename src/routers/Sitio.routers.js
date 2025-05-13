import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Obtener todos los sitios
router.get("/", async (req, res) => {
  try {
    const data = await prisma.sitio.findMany({
      include: {
        tipoSitio: true,
        areas: true,
      },
    });
    res.json(data);
  } catch (error) {
    console.error("Error al obtener sitios:", error);
    res.status(500).json({ error: "Error al obtener los sitios" });
  }
});

// Crear un nuevo sitio
router.post("/", async (req, res) => {
  try {
    const {
      nombre,
      ubicacion,
      tipoSitioId,
      fechaInicial,
      fechaFinal,
      activo, // <- agregado
    } = req.body;

    if (!nombre || !ubicacion || !tipoSitioId) {
      return res.status(400).json({ error: "Faltan campos requeridos" });
    }

    const nuevoSitio = await prisma.sitio.create({
      data: {
        nombre,
        ubicacion,
        tipoSitioId,
        fechaInicial: fechaInicial ? new Date(fechaInicial) : undefined,
        fechaFinal: fechaFinal ? new Date(fechaFinal) : undefined,
        activo: typeof activo === "boolean" ? activo : true, // <- añadido
      },
    });

    res.status(201).json(nuevoSitio);
  } catch (error) {
    console.error("Error al crear sitio:", error);
    res.status(500).json({ error: "Error al crear el sitio", detalle: error.message });
  }
});

// Actualizar un sitio existente
router.put("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const {
      nombre,
      ubicacion,
      tipoSitioId,
      fechaInicial,
      fechaFinal,
      activo, // <- agregado
    } = req.body;

    const sitioActualizado = await prisma.sitio.update({
      where: { id },
      data: {
        nombre,
        ubicacion,
        tipoSitioId,
        fechaInicial: fechaInicial ? new Date(fechaInicial) : undefined,
        fechaFinal: fechaFinal ? new Date(fechaFinal) : undefined,
        activo, // <- añadido
      },
    });

    res.json(sitioActualizado);
  } catch (error) {
    console.error("Error al actualizar sitio:", error);
    res.status(500).json({ error: "Error al actualizar el sitio", detalle: error.message });
  }
});

// Eliminar un sitio
router.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const sitioEliminado = await prisma.sitio.delete({
      where: { id },
    });

    res.json(sitioEliminado);
  } catch (error) {
    console.error("Error al eliminar sitio:", error);
    res.status(500).json({ error: "Error al eliminar el sitio", detalle: error.message });
  }
});

export default router;
