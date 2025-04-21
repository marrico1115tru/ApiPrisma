import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { verifyToken } from "../middlewares/verificarToken.js";

const router = Router();
const prisma = new PrismaClient();

// Rutas para AlertaVencimiento
router.get('/AlertaVencimiento', async (req, res) => {
    const AlertaVencimiento = await prisma.AlertaVencimiento.findMany();
    res.json(AlertaVencimiento);
});

router.post('/AlertaVencimiento', verifyToken, async (req, res) => {
    const nuevaAlertaVencimiento = await prisma.AlertaVencimiento.create({ data: req.body });
    res.json(nuevaAlertaVencimiento);
});

router.delete('/AlertaVencimiento/:id', verifyToken, async (req, res) => {
    const AlertaVencimientoEliminado = await prisma.AlertaVencimiento.delete({
        where: { id: parseInt(req.params.id) }
    });
    res.json(AlertaVencimientoEliminado);
});

router.put('/AlertaVencimiento/:id', verifyToken, async (req, res) => {
    const AlertaVencimientoActualizado = await prisma.AlertaVencimiento.update({
        where: { id: parseInt(req.params.id) },
        data: req.body
    });
    res.json(AlertaVencimientoActualizado);
});


export default router;