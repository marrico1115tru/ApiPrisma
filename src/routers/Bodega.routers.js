import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { verifyToken } from "../middlewares/verificarToken.js";

const router = Router();
const prisma = new PrismaClient();

// Rutas para areas
router.get('/Bodega', async (req, res) => {
    const Bodega = await prisma.bodega.findMany();
    res.json(Bodega);
});

router.post('/Bodega', async (req, res) => {
    const nuevaBodega = await prisma.bodega.create({ data: req.body });
    res.json(nuevaBodega);
});

router.delete('/Bodega/:id', verifyToken, async (req, res) => {
    const BodegaEliminado = await prisma.bodega.delete({
        where: { id: parseInt(req.params.id) }
    });
    res.json(BodegaEliminado);
});

router.put('/Bodega/:id', verifyToken, async (req, res) => {
    const BodegaActualizado = await prisma.bodega.update({
        where: { id: parseInt(req.params.id) },
        data: req.body
    });
    res.json(BodegaActualizado);
});


export default router;