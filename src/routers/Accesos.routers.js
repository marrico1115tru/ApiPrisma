import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { verifyToken } from "../middlewares/verificarToken.js";

const router = Router();
const prisma = new PrismaClient();

router.get('/Accesos', async (req, res) => {
    const Accesos = await prisma.Accesos.findMany();
    res.json(Accesos);
});

router.post('/Accesos', verifyToken, async (req, res) => {
    const nuevaAcceso = await prisma.Accesos.create({ data: req.body });
    res.json(nuevaAcceso);
});

router.delete('/Accesos/:id', verifyToken, async (req, res) => {
    const AccesoEliminado = await prisma.Accesos.delete({
        where: { id: parseInt(req.params.id) }
    });
    res.json(AccesoEliminado);
});

router.put('/Accesos/:id', verifyToken, async (req, res) => {
    const AccesoActualizado = await prisma.Accesos.update({
        where: { id: parseInt(req.params.id) },
        data: req.body
    });
    res.json(AccesoActualizado);
});

export default router;
