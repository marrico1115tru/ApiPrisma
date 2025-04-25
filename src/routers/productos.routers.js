import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// ✅ Crear un nuevo producto
router.post('/productos', async (req, res) => {
  try {
    const {
      codigo_sena,
      unspc,
      nombre,
      descripcion,
      cantidad,
      unidad_medida,
      tipo_material,
      id_area,
      id_categoria
    } = req.body;

    const producto = await prisma.productos.create({
      data: {
        codigo_sena,
        unspc,
        nombre,
        descripcion,
        cantidad,
        unidad_medida,
        tipo_material,
        id_area,
        id_categoria
      }
    });

    res.status(201).json(producto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el producto' });
  }
});

// ✅ Obtener todos los productos
router.get('/productos', async (req, res) => {
  try {
    const productos = await prisma.productos.findMany({
      include: {
        area: true,
        categoria: true
      }
    });
    res.json(productos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

// ✅ Obtener un producto por ID
router.get('/productos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const producto = await prisma.productos.findUnique({
      where: { id: Number(id) },
      include: {
        area: true,
        categoria: true
      }
    });
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(producto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
});

// ✅ Actualizar un producto por ID
router.put('/productos/:id', async (req, res) => {
  const { id } = req.params;
  const {
    codigo_sena,
    unspc,
    nombre,
    descripcion,
    cantidad,
    unidad_medida,
    tipo_material,
    id_area,
    id_categoria
  } = req.body;

  try {
    const producto = await prisma.productos.update({
      where: { id: Number(id) },
      data: {
        codigo_sena,
        unspc,
        nombre,
        descripcion,
        cantidad,
        unidad_medida,
        tipo_material,
        id_area,
        id_categoria
      }
    });
    res.json(producto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
});

// ✅ Eliminar un producto por ID
router.delete('/productos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.productos.delete({
      where: { id: Number(id) }
    });
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
});

export default router;
