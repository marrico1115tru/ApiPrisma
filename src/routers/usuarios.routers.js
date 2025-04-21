import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { verifyToken } from "../middlewares/verificarToken.js";

const router = Router();
const prisma = new PrismaClient();

// Rutas para Usuarios
router.get('/usuarios', async (req, res) => {
    const usuarios = await prisma.usuarios.findMany();
    res.json(usuarios);
});

router.post('/usuarios', async (req, res) => {
    const nuevoUsuario = await prisma.usuarios.create({ data: req.body });
    res.json(nuevoUsuario);
});

router.delete('/usuarios/:id', verifyToken, async (req, res) => {
    const usuarioEliminado = await prisma.usuarios.delete({
        where: { id: parseInt(req.params.id) }
    });
    res.json(usuarioEliminado);
});

router.put('/usuarios/:id', verifyToken, async (req, res) => {
    const usuarioActualizado = await prisma.usuarios.update({
        where: { id: parseInt(req.params.id) },
        data: req.body
    });
    res.json(usuarioActualizado);
});

router.post('/login', async (req, res) => {
    try {
        const {  cedula, nombre  } = req.body;

        if (!cedula || !nombre) {
            return res.status(400).json({ mensaje: "Cedula y Nombre son requeridos" });
        }

        const usuarios = await prisma.usuarios.findUnique({
            where: { cedula: parseInt(cedula) },
        });

        if (!usuarios) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        // Comparar la contraseña hasheada
        const isMatch = await bcrypt.compare(cedula, usuarios.cedula);
        if (!isMatch) {
            return res.status(400).json({ mensaje: "Contraseña incorrecta" });
        }

        // Generar el token con más información
        const token = jwt.sign(
            { id: usuarios.cedula, cedula: usuarios.cedula },
            SECRET_KEY,
            { expiresIn: "1h" }
        );

        return res.json({ token, usuarios });
    } catch (error) {
        console.error("Error al iniciar sesión:", error.message);
        return res.status(500).json({ mensaje: "Error en el servidor" });
    }
});

export default router;