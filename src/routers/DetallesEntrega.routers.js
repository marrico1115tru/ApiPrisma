import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { verifyToken } from "../middlewares/verificarToken.js";

const router = Router();
const prisma = new PrismaClient();

// Rutas para DetallesEntrega
router.get('/DetallesEntrega', async (req, res) => {
    const DetallesEntrega = await prisma.DetallesEntrega.findMany();
    res.json(DetallesEntrega);
});

router.post('/DetallesEntrega', verifyToken, async (req, res) => {
    const nuevoDetallesEntrega = await prisma.DetallesEntrega.create({ data: req.body });
    res.json(nuevoDetallesEntrega);
});

router.delete('/DetallesEntrega/:id', verifyToken, async (req, res) => {
    const DetallesEntregaEliminado = await prisma.DetallesEntrega.delete({
        where: { id: parseInt(req.params.id) }
    });
    res.json(DetallesEntregaEliminado);
});

router.put('/DetallesEntrega/:id', verifyToken, async (req, res) => {
    const DetallesEntregaActualizado = await prisma.DetallesEntrega.update({
        where: { id: parseInt(req.params.id) },
        data: req.body
    });
    res.json(DetallesEntregaActualizado);
});


export default router;