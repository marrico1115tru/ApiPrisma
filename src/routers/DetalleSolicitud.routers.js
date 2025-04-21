import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { verifyToken } from "../middlewares/verificarToken.js";

const router = Router();
const prisma = new PrismaClient();

// Rutas para DetalleSolicitud
router.get('/DetalleSolicitud', async (req, res) => {
    const DetalleSolicitud = await prisma.DetalleSolicitud.findMany();
    res.json(DetalleSolicitud);
});

router.post('/DetalleSolicitud', verifyToken, async (req, res) => {
    const nuevoDetalleSolicitud = await prisma.DetalleSolicitud.create({ data: req.body });
    res.json(nuevoDetalleSolicitud);
});

router.delete('/DetalleSolicitud/:id', verifyToken, async (req, res) => {
    const DetalleSolicitudEliminado = await prisma.DetalleSolicitud.delete({
        where: { id: parseInt(req.params.id) }
    });
    res.json(DetalleSolicitudEliminado);
});

router.put('/DetalleSolicitud/:id', verifyToken, async (req, res) => {
    const DetalleSolicitudActualizado = await prisma.DetalleSolicitud.update({
        where: { id: parseInt(req.params.id) },
        data: req.body
    });
    res.json(DetalleSolicitudActualizado);
});


export default router;