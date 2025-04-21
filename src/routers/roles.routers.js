import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { verifyToken } from "../middlewares/verificarToken.js";

const router = Router();
const prisma = new PrismaClient();

router.get('/roles', async (req, res) => {
    const roles = await prisma.roles.findMany();
    res.json(roles);
});

router.post('/roles', verifyToken, async (req, res) => {
    const nuevorol = await prisma.roles.create({ data: req.body });
    res.json(nuevorol);
});

router.delete('/roles/:id', verifyToken, async (req, res) => {
    const rolEliminado = await prisma.roles.delete({
        where: { id: parseInt(req.params.id) }
    });
    res.json(rolEliminado);
});

router.put('/roles/:id', verifyToken, async (req, res) => {
    const rolActualizado = await prisma.roles.update({
        where: { id: parseInt(req.params.id) },
        data: req.body
    });
    res.json(rolActualizado);
});

export default router;
