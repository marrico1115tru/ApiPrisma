import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// ==============================
// 🔹 Listar todos los productos
// ==============================
router.get('/', async (req, res) => {
  try {
    const productos = await prisma.producto.findMany({
      include: {
        area: {
          include: {
            centroFormacion: true,
          }
        },
        detalles: {
          include: {
            solicitud: true,
          }
        }
      }
    });

    const reporte = productos.map((producto) => {
      const cantidadTotalSolicitada = producto.detalles.reduce((acc, ds) => acc + ds.cantidadSolicitada, 0);
      const fechasSolicitudes = producto.detalles.map(ds => ds.solicitud.fechaSolicitud);

      const fechaUltimaSolicitud = fechasSolicitudes.length > 0
        ? new Date(Math.max(...fechasSolicitudes.map(f => new Date(f).getTime()))).toISOString().split('T')[0]
        : null;

      return {
        id: producto.id,
        codigoSena: producto.codigoSena,
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        cantidad: producto.cantidad,
        categoria: producto.categoria,
        tipoMateria: producto.tipoMateria,
        area: producto.area?.nombre || 'Sin área',
        centroFormacion: producto.area?.centroFormacion?.nombre || 'Sin centro',
        cantidadTotalSolicitada,
        unidadesDisponibles: producto.cantidad,
        fechaUltimaSolicitud,
        fechaVencimiento: producto.fechaVencimiento,
      };
    });

    res.json(reporte);
  } catch (error) {
    console.error('Error al listar productos:', error);
    res.status(500).json({ error: 'Error al listar productos', detalles: error });
  }
});

// ==============================
// 🔹 Crear un nuevo producto
// ==============================
router.post('/', async (req, res) => {
  try {
    const nuevoProducto = await prisma.producto.create({
      data: req.body,
    });
    res.status(201).json(nuevoProducto);
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).json({ error: 'Error al crear producto', detalles: error });
  }
});

// ==============================
// 🔹 Editar un producto
// ==============================
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const producto = await prisma.producto.update({
      where: { id: parseInt(id) },
      data: req.body,
    });
    res.json(producto);
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(500).json({ error: 'Error al actualizar producto', detalles: error });
  }
});

// ==============================
// 🔹 Eliminar un producto
// ==============================
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.producto.delete({
      where: { id: parseInt(id) },
    });
    res.json({ mensaje: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({ error: 'Error al eliminar producto', detalles: error });
  }
});

export default router;
