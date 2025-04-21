import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { verifyToken } from "../middlewares/verificarToken.js";

const router = Router();
const prisma = new PrismaClient();

// Rutas para EntregaMaterial
router.get('/EntregaMaterial', async (req, res) => {
    const EntregaMaterial = await prisma.EntregaMaterial.findMany();
    res.json(EntregaMaterial);
});

router.post('/EntregaMaterial', verifyToken, async (req, res) => {
    const nuevaEntregaMaterial = await prisma.EntregaMaterial.create({ data: req.body });
    res.json(nuevaEntregaMaterial);
});

router.delete('/EntregaMaterial/:id', verifyToken, async (req, res) => {
    const EntregaMaterialEliminado = await prisma.EntregaMaterial.delete({
        where: { id: parseInt(req.params.id) }
    });
    res.json(EntregaMaterialEliminado);
});

router.put('/EntregaMaterial/:id', verifyToken, async (req, res) => {
    const EntregaMaterialActualizado = await prisma.EntregaMaterial.update({
        where: { id: parseInt(req.params.id) },
        data: req.body
    });
    res.json(EntregaMaterialActualizado);
});


export default router;