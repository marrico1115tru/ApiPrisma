import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { verifyToken } from "../middlewares/verificarToken.js";

const router = Router();
const prisma = new PrismaClient();

// Rutas para Solicitudes
router.get('/usuarioSolicitudes', async (req, res) => {
    const Solicitudes = await prisma.Solicitudes.findMany();
    res.json(Solicitudes);
});

router.post('/Solicitudes', verifyToken, async (req, res) => {
    const nuevaSolicitudes = await prisma.Solicitudes.create({ data: req.body });
    res.json(nuevaSolicitudes);
});

router.delete('/Solicitudes/:id', verifyToken, async (req, res) => {
    const SolicitudesEliminado = await prisma.Solicitudes.delete({
        where: { id: parseInt(req.params.id) }
    });
    res.json(SolicitudesEliminado);
});

router.put('/Solicitudes/:id', verifyToken, async (req, res) => {
    const SolicitudesActualizado = await prisma.Solicitudes.update({
        where: { id: parseInt(req.params.id) },
        data: req.body
    });
    res.json(SolicitudesActualizado);
});


export default router;