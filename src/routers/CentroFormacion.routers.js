import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { verifyToken } from "../middlewares/verificarToken.js";

const router = Router();
const prisma = new PrismaClient();

router.get('/CentroFormacion', async (req, res) => {
    const CentroFormacion = await prisma.centroFormacion.findMany();
    res.json(CentroFormacion);
});

router.post('/CentroFormacion',  async (req, res) => {
    const nuevoCentroFormacion= await prisma.centroFormacion.create({ data: req.body });
    res.json(nuevoCentroFormacion);
});

router.delete('/CentroFormacion/:id', verifyToken, async (req, res) => {
    const CentroFormacionEliminado = await prisma.centroFormacion.delete({
        where: { id: parseInt(req.params.id) }
    });
    res.json(CentroFormacionEliminado);
});

router.put('/CentroFormacion/:id', verifyToken, async (req, res) => {
    const CentroFormacionActualizado = await prisma.centroFormacion.update({
        where: { id: parseInt(req.params.id) },
        data: req.body
    });
    res.json(CentroFormacionActualizado);
});

export default router;
