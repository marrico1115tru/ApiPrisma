import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { verifyToken } from "../middlewares/verificarToken.js";

const router = Router();
const prisma = new PrismaClient();

router.get('/opciones', async (req, res) => {
    const opciones = await prisma.opciones.findMany();
    res.json(opciones);
});

router.post('/opciones', verifyToken, async (req, res) => {
    const nuevaOpcion = await prisma.opciones.create({ data: req.body });
    res.json(nuevaOpcion);
});

router.delete('/opciones/:id', verifyToken, async (req, res) => {
    const opcionEliminado = await prisma.opciones.delete({
        where: { id: parseInt(req.params.id) }
    });
    res.json(opcionEliminado);
});

router.put('/opciones/:id', verifyToken, async (req, res) => {
    const opcionActualizado = await prisma.opciones.update({
        where: { id: parseInt(req.params.id) },
        data: req.body
    });
    res.json(opcionesActualizado);
});

export default router;
