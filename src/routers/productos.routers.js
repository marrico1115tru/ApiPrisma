import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();


// ✅ CREAR PRODUCTO
router.post('/', async (req, res) => {
  try {
    const {
      codigoSena,
      unspc = '',
      nombre,
      descripcion,
      cantidad,
      categoria,
      tipoMateria,
      fechaVencimiento,
      areaId,
      fechaInicial,
      fechaFinal,
    } = req.body;

    // Validación básica
    if (!codigoSena || !nombre || cantidad == null || !categoria || !tipoMateria || !areaId) {
      return res.status(400).json({ message: 'Campos obligatorios faltantes.' });
    }

    const nuevoProducto = await prisma.producto.create({
      data: {
        codigoSena,
        unspc,
        nombre,
        descripcion,
        cantidad: Number(cantidad),
        categoria,
        tipoMateria,
        fechaVencimiento: fechaVencimiento ? new Date(fechaVencimiento) : null,
        areaId: Number(areaId),
        fechaInicial: fechaInicial ? new Date(fechaInicial) : new Date(),
        fechaFinal: fechaFinal ? new Date(fechaFinal) : new Date(),
      }
    });

    res.status(201).json(nuevoProducto);
  } catch (error) {
    console.error('❌ Error al crear producto:', error);
    res.status(500).json({ message: 'Error al crear producto' });
  }
});

// ✅ LISTAR PRODUCTOS
router.get('/', async (req, res) => {
  try {
    const productos = await prisma.producto.findMany({
      include: {
        area: true,
        detalles: true,
        historial: true,
      }
    });
    res.json(productos);
  } catch (error) {
    console.error('❌ Error al obtener productos:', error);
    res.status(500).json({ message: 'Error al obtener productos' });
  }
});

// ✅ EDITAR PRODUCTO
router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const {
      codigoSena,
      unspc = '',
      nombre,
      descripcion,
      cantidad,
      categoria,
      tipoMateria,
      fechaVencimiento,
      areaId,
      fechaInicial,
      fechaFinal,
    } = req.body;

    if (!codigoSena || !nombre || cantidad == null || !categoria || !tipoMateria || !areaId) {
      return res.status(400).json({ message: 'Campos obligatorios faltantes.' });
    }

    const productoActualizado = await prisma.producto.update({
      where: { id },
      data: {
        codigoSena,
        unspc,
        nombre,
        descripcion,
        cantidad: Number(cantidad),
        categoria,
        tipoMateria,
        fechaVencimiento: fechaVencimiento ? new Date(fechaVencimiento) : null,
        areaId: Number(areaId),
        fechaInicial: fechaInicial ? new Date(fechaInicial) : new Date(),
        fechaFinal: fechaFinal ? new Date(fechaFinal) : new Date(),
      }
    });

    res.json(productoActualizado);
  } catch (error) {
    console.error('❌ Error al actualizar producto:', error);
    res.status(500).json({ message: 'Error al actualizar producto' });
  }
});

// ✅ ELIMINAR PRODUCTO
router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    await prisma.producto.delete({
      where: { id }
    });

    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error('❌ Error al eliminar producto:', error);
    res.status(500).json({ message: 'Error al eliminar producto' });
  }
});




// Productos por área y cantidad disponible
router.get("/estadisticas/por-area", async (req, res) => {
  try {
    const productos = await prisma.producto.groupBy({
      by: ["areaId"],
      _sum: { cantidad: true },
    });

    const resultados = await Promise.all(
      productos.map(async (item) => {
        const area = await prisma.area.findUnique({ where: { id: item.areaId } });
        return {
          area: area?.nombre || "Desconocido",
          cantidad: item._sum.cantidad || 0,
        };
      })
    );

    res.status(200).json(resultados);
  } catch (error) {
    console.error("Error al obtener productos por área:", error);
    res.status(500).json({ error: "Error al obtener productos por área", detalles: error.message });
  }
});


// Ruta en el backend para obtener productos próximos a vencer
router.get("/estadisticas/proximos-vencer", async (req, res) => {
  try {
    // Establecer la fecha límite a 30 días a partir de hoy
    const fechaLimite = new Date();
    fechaLimite.setDate(fechaLimite.getDate() + 30);

    
    const productos = await prisma.producto.findMany({
      where: {
        fechaVencimiento: {
          gte: new Date(),           
          lte: fechaLimite,          
        },
      },
      select: {
        id: true,
        nombre: true,
        fechaVencimiento: true,
        cantidad: true,
        area: {
          select: {
            nombre: true,  // Asegúrate de seleccionar el nombre del área
          },
        },
      },
    });

    // Devuelve los productos junto con la fecha de vencimiento en formato ISO
    res.status(200).json(productos);
  } catch (error) {
    console.error("Error al obtener productos próximos a vencer:", error);
    res.status(500).json({ error: "Error al obtener productos próximos a vencer", detalles: error.message });
  }
});


// Productos vencidos
router.get("/estadisticas/vencidos", async (req, res) => {
  try {
    const productosVencidos = await prisma.producto.findMany({
      where: {
        fechaVencimiento: {
          lt: new Date(),
        },
      },
      select: {
        id: true,
        nombre: true,
        fechaVencimiento: true,
        cantidad: true,
      },
    });

    res.status(200).json(productosVencidos);
  } catch (error) {
    console.error("Error al obtener productos vencidos:", error);
    res.status(500).json({ error: "Error al obtener productos vencidos", detalles: error.message });
  }
});

// Top 5 productos más y menos utilizados
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
    console.error("Error al obtener estadísticas de uso:", error);
    res.status(500).json({ error: "Error al obtener estadísticas de uso", detalles: error.message });
  }
});

// Historial de uso por producto
router.get("/estadisticas/historial/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const historial = await prisma.historialProducto.findMany({
      where: { productoId: parseInt(id) },
      orderBy: { fecha: "desc" },
      include: { usuario: true },
    });

    res.status(200).json(historial);
  } catch (error) {
    console.error("Error al obtener historial del producto:", error);
    res.status(500).json({ error: "Error al obtener historial de uso", detalles: error.message });
  }
});

export default router;
