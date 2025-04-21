import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { verifyToken } from "../middlewares/verificarToken.js";

const router = Router();
const prisma = new PrismaClient();

// Rutas para Titulados
router.get('/Titulado', async (req, res) => {
    const titulados = await prisma.Titulado.findMany();
    res.json(titulados);
});

router.post('/Titulado', verifyToken, async (req, res) => {
    const nuevoTitulado = await prisma.Titulado.create({ data: req.body });
    res.json(nuevoTitulado);
});

router.delete('/Titulado/:id', verifyToken, async (req, res) => {
    const tituladoEliminado = await prisma.Titulado.delete({
        where: { id: parseInt(req.params.id) }
    });
    res.json(tituladoEliminado);
});

router.put('/Titulado/:id', verifyToken, async (req, res) => {
    const tituladoActualizado = await prisma.Titulado.update({
        where: { id: parseInt(req.params.id) },
        data: req.body
    });
    res.json(tituladoActualizado);
});

export default router;
