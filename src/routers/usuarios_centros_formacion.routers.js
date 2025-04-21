import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { verifyToken } from "../middlewares/verificarToken.js";

const router = Router();
const prisma = new PrismaClient();

router.get('/usuarios_centros_formacion', async (req, res) => {
    const registros = await prisma.usuarios_centros_formacion.findMany();
    res.json(registros);
});

router.post('/usuarios_centros_formacion', verifyToken, async (req, res) => {
    const nuevoRegistro = await prisma.usuarios_centros_formacion.create({ data: req.body });
    res.json(nuevoRegistro);
});

router.delete('/usuarios_centros_formacion/:id', verifyToken, async (req, res) => {
    const registroEliminado = await prisma.usuarios_centros_formacion.delete({
        where: { id: parseInt(req.params.id) }
    });
    res.json(registroEliminado);
});

router.put('/usuarios_centros_formacion/:id', verifyToken, async (req, res) => {
    const registroActualizado = await prisma.usuarios_centros_formacion.update({
        where: { id: parseInt(req.params.id) },
        data: req.body
    });
    res.json(registroActualizado);
});
