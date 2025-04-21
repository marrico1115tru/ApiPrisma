import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { verifyToken } from "../middlewares/verificarToken.js"; // opcional si lo usas

const router = Router();
const prisma = new PrismaClient();

// Obtener productos (con opción de filtrar por nombre de categoría)
router.get('/productos', async (req, res) => {
    const { categoria } = req.query;

    try {
        if (categoria) {
            const categoriaEncontrada = await prisma.categoria.findFirst({
                where: { nombre: categoria },
            });

            if (!categoriaEncontrada) {
                return res.status(404).json({ error: 'Categoría no encontrada' });
            }

            const productos = await prisma.productos.findMany({
                where: {
                    id_categoria: categoriaEncontrada.id,
                },
            });

            return res.json(productos);
        }

        // Si no se proporciona categoría, retorna todos los productos
        const productos = await prisma.productos.findMany();
        res.json(productos);

    } catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).json({ error: 'Error al obtener productos' });
    }
});

// Crear un nuevo producto
router.post('/productos', async (req, res) => {
    try {
        const nuevoProducto = await prisma.productos.create({
            data: req.body,
        });
        res.json(nuevoProducto);
    } catch (error) {
        console.error("Error al crear producto:", error);
        res.status(500).json({ error: 'Error al crear producto' });
    }
});

// Eliminar un producto por ID
router.delete('/productos/:id', async (req, res) => {
    try {
        const productoEliminado = await prisma.productos.delete({
            where: { id: parseInt(req.params.id) },
        });
        res.json(productoEliminado);
    } catch (error) {
        console.error("Error al eliminar producto:", error);
        res.status(500).json({ error: 'Error al eliminar producto' });
    }
});

// Actualizar un producto por ID
router.put('/productos/:id', async (req, res) => {
    try {
        const productoActualizado = await prisma.productos.update({
            where: { id: parseInt(req.params.id) },
            data: req.body,
        });
        res.json(productoActualizado);
    } catch (error) {
        console.error("Error al actualizar producto:", error);
        res.status(500).json({ error: 'Error al actualizar producto' });
    }
});

export default router;
