import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const productos = await prisma.producto.findMany({
      include: { area: true },
    });
    res.status(200).json(productos);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ error: "Error al obtener productos", detalles: error.message });
  }
});

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

// Endpoint para productos por stock
router.get("/estadisticas/por-stock", async (req, res) => {
  try {
    const productos = await prisma.producto.findMany({
      select: {
        nombre: true,
        cantidad: true,
      },
    });
    res.status(200).json(productos);
  } catch (error) {
    console.error("Error al obtener productos por stock:", error);
    res.status(500).json({ error: "Error al obtener datos de stock", detalles: error.message });
  }
});

// Endpoint para productos más y menos utilizados
router.get("/estadisticas/uso", async (req, res) => {
  try {
    const masUsados = await prisma.historialProducto.groupBy({
      by: ["productoId"],
      _sum: { cantidad: true },
      orderBy: { _sum: { cantidad: "desc" } },
      take: 5,
    });

    const menosUsados = await prisma.historialProducto.groupBy({
      by: ["productoId"],
      _sum: { cantidad: true },
      orderBy: { _sum: { cantidad: "asc" } },
      take: 5,
    });

    const getNombre = async (lista) =>
      Promise.all(
        lista.map(async (item) => {
          const producto = await prisma.producto.findUnique({ where: { id: item.productoId } });
          return {
            nombre: producto?.nombre || "Desconocido",
            cantidad: item._sum.cantidad || 0,
          };
        })
      );

    const mas = await getNombre(masUsados);
    const menos = await getNombre(menosUsados);

    res.status(200).json({ mas, menos });
  } catch (error) {
    console.error("Error al obtener productos utilizados:", error);
    res.status(500).json({ error: "Error al obtener estadísticas de uso", detalles: error.message });
  }
});

// Endpoint para productos vencidos
router.get("/estadisticas/vencidos", async (req, res) => {
  try {
    // Asegúrate de que se estén tomando productos con fechaVencimiento < fecha actual
    const productosVencidos = await prisma.producto.findMany({
      where: {
        fechaVencimiento: {
          lt: new Date(), // Verifica que realmente haya productos con vencimiento pasado
        },
      },
      select: {
        id: true,
        nombre: true,
        fechaVencimiento: true,
        cantidad: true,
      },
    });

    // Si no se encuentran productos vencidos, devuelve un mensaje claro
    if (productosVencidos.length === 0) {
      return res.status(200).json({ mensaje: "No hay productos vencidos." });
    }

    res.status(200).json(productosVencidos);
  } catch (error) {
    console.error("Error al obtener productos vencidos:", error);
    res.status(500).json({ error: "Error al obtener productos vencidos", detalles: error.message });
  }
});

export default router;
