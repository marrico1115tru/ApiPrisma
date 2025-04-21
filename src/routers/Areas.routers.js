import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { verifyToken } from "../middlewares/verificarToken.js";

const router = Router();
const prisma = new PrismaClient();

// Rutas para areas
router.get('/Areas', async (req, res) => {
    const Areas = await prisma.areas.findMany();
    res.json(Areas);
});

router.post('/Areas', async (req, res) => {
    const nuevaAreas = await prisma.areas.create({ data: req.body });
    res.json(nuevaAreas);
});

router.delete('/Areas/:id', verifyToken, async (req, res) => {
    const AreasEliminado = await prisma.areas.delete({
        where: { id: parseInt(req.params.id) }
    });
    res.json(AreasEliminado);
});

router.put('/Areas/:id', verifyToken, async (req, res) => {
    const AreasActualizado = await prisma.areas.update({
        where: { id: parseInt(req.params.id) },
        data: req.body
    });
    res.json(AreasActualizado);
});


export default router;