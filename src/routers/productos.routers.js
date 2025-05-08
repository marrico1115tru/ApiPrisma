import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

// Listar productos
router.get('/', async (req, res) => {
  try {
    const productos = await prisma.producto.findMany({
      include: { area: true }
    })
    res.json(productos)
  } catch (error) {
    res.status(500).json({ error: 'Error al listar productos', detalles: error })
  }
})

// Crear producto
router.post('/', async (req, res) => {
  try {
    const nuevoProducto = await prisma.producto.create({
      data: req.body
    })
    res.status(201).json(nuevoProducto)
  } catch (error) {
    res.status(500).json({ error: 'Error al crear producto', detalles: error })
  }
})

// Editar producto
router.put('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const producto = await prisma.producto.update({
      where: { id: parseInt(id) },
      data: req.body
    })
    res.json(producto)
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar producto', detalles: error })
  }
})

// Eliminar producto
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    await prisma.producto.delete({
      where: { id: parseInt(id) }
    })
    res.json({ mensaje: 'Producto eliminado correctamente' })
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar producto', detalles: error })
  }
})





// Reporte de productos
router.get('/', async (req, res) => {
  try {
    const productos = await prisma.producto.findMany({
      select: {
        id: true,
        nombre: true,
        tipo_material: true,
        unidad_medida: true,
        cantidad: true,
        fecha_caducidad: true,
        categoria: {
          select: {
            nombre: true
          }
        },
        area: {
          select: {
            nombre: true,
            centro_formacion: {
              select: {
                nombre: true
              }
            }
          }
        },
        detalle_solicitud: {
          select: {
            cantidad: true,
            solicitud: {
              select: {
                fecha: true
              }
            }
          }
        }
      }
    });

    // Procesar datos para calcular totales y formato
    const reporte = productos.map(producto => {
      const cantidad_total_solicitada = producto.detalle_solicitud.reduce((acc, ds) => acc + ds.cantidad, 0);
      const fechasSolicitudes = producto.detalle_solicitud.map(ds => ds.solicitud.fecha);
      const fecha_ultima_solicitud = fechasSolicitudes.length > 0
        ? new Date(Math.max(...fechasSolicitudes.map(f => new Date(f).getTime()))).toISOString().split('T')[0]
        : null;

      return {
        id_producto: producto.id,
        nombre_producto: producto.nombre,
        tipo_material: producto.tipo_material,
        unidad_medida: producto.unidad_medida,
        categoria: producto.categoria?.nombre || 'Sin categoría',
        cantidad_total_solicitada,
        unidades_disponibles: producto.cantidad,
        area: producto.area?.nombre || 'Sin área',
        centro_formacion: producto.area?.centro_formacion?.nombre || 'Sin centro',
        fecha_ultima_solicitud
      };
    });

    res.json(reporte);
  } catch (error) {
    console.error('Error al generar el reporte de productos:', error);
    res.status(500).json({ error: 'Error al generar el reporte', detalles: error });
  }
});




export default router
