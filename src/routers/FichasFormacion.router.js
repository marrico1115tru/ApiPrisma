import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { verifyToken } from "../middlewares/verificarToken.js";

const router = Router();
const prisma = new PrismaClient();

// Rutas para FichasFormacion
router.get('/FichasFormacion', async (req, res) => {
    const fichas = await prisma.FichasFormacion.findMany();
    res.json(fichas);
});

router.post('/FichasFormacion', async (req, res) => {
    const nuevaFicha = await prisma.FichasFormacion.create({ data: req.body });
    res.json(nuevaFicha);
});

router.delete('/FichasFormacion/:id', verifyToken, async (req, res) => {
    const fichaEliminada = await prisma.FichasFormacion.delete({
        where: { id: parseInt(req.params.id) }
    });
    res.json(fichaEliminada);
});

router.put('/FichasFormacion/:id', verifyToken, async (req, res) => {
    const fichaActualizada = await prisma.FichasFormacion.update({
        where: { id: parseInt(req.params.id) },
        data: req.body
    });
    res.json(fichaActualizada);
});

export default router;
