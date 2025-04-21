import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { verifyToken } from "../middlewares/verificarToken.js";

const router = Router();
const prisma = new PrismaClient();

router.get('/RegistroProductos', async (req, res) => {
    const RegistroProductos = await prisma.RegistroProductos.findMany();
    res.json(RegistroProductos);
});

router.post('/RegistroProductos', verifyToken, async (req, res) => {
    const nuevoRegistroProductos = await prisma.RegistroProductos.create({ data: req.body });
    res.json(nuevoRegistroProductos);
});

router.delete('/RegistroProductos/:id', verifyToken, async (req, res) => {
    const RegistroProductosEliminado = await prisma.productoRegistro.delete({
        where: { id: parseInt(req.params.id) }
    });
    res.json(RegistroProductosEliminado);
});

router.put('/RegistroProductos/:id', verifyToken, async (req, res) => {
    const RegistroProductosActualizado = await prisma.RegistroProductos.update({
        where: { id: parseInt(req.params.id) },
        data: req.body
    });
    res.json(RegistroProductosActualizado);
});

export default router;
