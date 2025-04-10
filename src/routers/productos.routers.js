import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { verifyToken } from "../middlewares/verificarToken.js";

const router = Router();
const prisma = new PrismaClient();

router.get('/productos', async (req, res) => {
    const productos = await prisma.productos.findMany();
    res.json(productos);
});

router.post('/productos', verifyToken, async (req, res) => {
    const nuevoProducto = await prisma.productos.create({ data: req.body });
    res.json(nuevoProducto);
});

router.delete('/productos/:id', verifyToken, async (req, res) => {
    const productoEliminado = await prisma.productos.delete({
        where: { id: parseInt(req.params.id) }
    });
    res.json(productoEliminado);
});

router.put('/productos/:id', verifyToken, async (req, res) => {
    const productoActualizado = await prisma.productos.update({
        where: { id: parseInt(req.params.id) },
        data: req.body
    });
    res.json(productoActualizado);
});

export default router;
