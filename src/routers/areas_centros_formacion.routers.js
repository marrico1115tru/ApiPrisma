import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { verifyToken } from "../middlewares/verificarToken.js";

const router = Router();
const prisma = new PrismaClient();

router.get('/areas_centros_formacion', async (req, res) => {
    const registros = await prisma.areas_Centros_Formacion.findMany();
    res.json(registros);
});

router.post('/areas_centros_formacion', async (req, res) => {
    const nuevoRegistro = await prisma.areas_Centros_Formacion.create({ data: req.body });
    res.json(nuevoRegistro);
});

router.delete('/areas_centros_formacion/:id', verifyToken, async (req, res) => {
    const registroEliminado = await prisma.areas_Centros_Formacion.delete({
        where: { id: parseInt(req.params.id) }
    });
    res.json(registroEliminado);
});

router.put('/areas_centros_formacion/:id', verifyToken, async (req, res) => {
    const registroActualizado = await prisma.areas_centros_formacion.update({
        where: { id: parseInt(req.params.id) },
        data: req.body
    });
    res.json(registroActualizado);
});

export default router;
