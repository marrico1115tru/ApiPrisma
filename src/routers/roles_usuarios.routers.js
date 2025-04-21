import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { verifyToken } from "../middlewares/verificarToken.js";

const router = Router();
const prisma = new PrismaClient();

router.get('/roles_usuarios', async (req, res) => {
    const roles_usuarios = await prisma.roles_usuarios.findMany();
    res.json(roles_usuarios);
});

router.post('/roles_usuarios', verifyToken, async (req, res) => {
    const nuevoRoles_usuarios = await prisma.roles_usuarios.create({ data: req.body });
    res.json(nuevoRoles_usuarios);
});

router.delete('/roles_usuarios/:id', verifyToken, async (req, res) => {
    const roles_usuariosEliminado = await prisma.roles_usuarios.delete({
        where: { id: parseInt(req.params.id) }
    });
    res.json(roles_usuariosEliminado);
});

router.put('/roles_usuarios/:id', verifyToken, async (req, res) => {
    const roles_usuariosActualizado = await prisma.roles_usuarios.update({
        where: { id: parseInt(req.params.id) },
        data: req.body
    });
    res.json(roles_usuariosActualizado);
});

export default router;
