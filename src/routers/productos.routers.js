import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Crear un nuevo producto
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

export default router;
