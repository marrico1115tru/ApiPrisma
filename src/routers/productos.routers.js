import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// ✅ Obtener todos los productos
router.get("/", async (req, res) => {
  try {
    const productos = await prisma.producto.findMany({
      include: { area: true } // Incluye la información del área relacionada
    });
    res.status(200).json(productos);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ error: "Error al obtener productos", detalles: error.message });
  }
});

// ✅ Crear un nuevo producto
router.post("/", async (req, res) => {
  try {
    const nuevoProducto = await prisma.producto.create({
      data: req.body,
    });
    res.status(201).json(nuevoProducto);
  } catch (error) {
    console.error("Error al crear producto:", error);
    res.status(500).json({ error: "Error al crear producto", detalles: error.message });
  }
});

// ✅ Actualizar un producto existente
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const productoActualizado = await prisma.producto.update({
      where: { id: parseInt(id) },
      data: req.body,
    });
    res.status(200).json(productoActualizado);
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    res.status(500).json({ error: "Error al actualizar producto", detalles: error.message });
  }
});

// ✅ Eliminar un producto
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.producto.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ mensaje: "Producto eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    res.status(500).json({ error: "Error al eliminar producto", detalles: error.message });
  }
});

export default router;
