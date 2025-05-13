import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Obtener todos los registros de historial de productos
router.get("/", async (req, res) => {
  try {
    const historial = await prisma.historialProducto.findMany({
      include: {
        producto: true,
        usuario: true,
      },
    });
    res.json(historial);
  } catch (error) {
    console.error("Error al obtener historial de productos:", error);
    res.status(500).json({ error: "Error al obtener el historial de productos" });
  }
});

// Crear un nuevo registro en el historial de productos
router.post("/", async (req, res) => {
  try {
    const { productoId, usuarioId, cantidad, fechaUso } = req.body;

    if (!productoId || !usuarioId || !cantidad) {
      return res.status(400).json({ error: "Faltan campos requeridos" });
    }

    const nuevoHistorial = await prisma.historialProducto.create({
      data: {
        productoId,
        usuarioId,
        cantidad,
        fechaUso: fechaUso ? new Date(fechaUso) : undefined,
      },
    });

    res.status(201).json(nuevoHistorial);
  } catch (error) {
    console.error("Error al crear historial de producto:", error);
    res.status(500).json({ error: "Error al crear el historial de producto", detalle: error.message });
  }
});

// Actualizar un registro de historial de producto existente
router.put("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { productoId, usuarioId, cantidad, fechaUso } = req.body;

    const historialActualizado = await prisma.historialProducto.update({
      where: { id },
      data: {
        productoId,
        usuarioId,
        cantidad,
        fechaUso: fechaUso ? new Date(fechaUso) : undefined,
      },
    });

    res.json(historialActualizado);
  } catch (error) {
    console.error("Error al actualizar historial de producto:", error);
    res.status(500).json({ error: "Error al actualizar el historial de producto", detalle: error.message });
  }
});

// Eliminar un registro de historial de producto
router.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const historialEliminado = await prisma.historialProducto.delete({
      where: { id },
    });

    res.json(historialEliminado);
  } catch (error) {
    console.error("Error al eliminar historial de producto:", error);
    res.status(500).json({ error: "Error al eliminar el historial de producto", detalle: error.message });
  }
});

export default router;
