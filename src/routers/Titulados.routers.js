import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { verifyToken } from "../middlewares/verificarToken.js";

const router = Router();
const prisma = new PrismaClient();

// Rutas para Titulados

// Obtener todos los titulados
router.get('/Titulado', async (req, res) => {
    try {
        const titulados = await prisma.titulados.findMany();
        res.json(titulados);
    } catch (error) {
        console.error('Error al obtener titulados:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Crear un nuevo titulado
router.post('/Titulado', async (req, res) => {
    try {
        const { nombre, fecha_inicio, fecha_fin } = req.body;

        // Validación básica
        if (!nombre || !fecha_inicio || !fecha_fin) {
            return res.status(400).json({ error: "Faltan campos requeridos" });
        }

        const nuevoTitulado = await prisma.titulados.create({
            data: {
                nombre,
                fecha_inicio: new Date(fecha_inicio),
                fecha_fin: new Date(fecha_fin),
            },
        });
        res.json(nuevoTitulado);
    } catch (error) {
        console.error('Error al crear titulado:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Eliminar un titulado
router.delete('/Titulado/:id', async (req, res) => {
    try {
        const tituladoEliminado = await prisma.titulados.delete({
            where: { id: parseInt(req.params.id) },
        });
        res.json(tituladoEliminado);
    } catch (error) {
        console.error('Error al eliminar titulado:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Actualizar un titulado
router.put('/Titulado/:id', verifyToken, async (req, res) => {
    try {
        const { nombre, fecha_inicio, fecha_fin } = req.body;

        const tituladoActualizado = await prisma.titulados.update({
            where: { id: parseInt(req.params.id) },
            data: {
                nombre,
                fecha_inicio: new Date(fecha_inicio),
                fecha_fin: new Date(fecha_fin),
            },
        });
        res.json(tituladoActualizado);
    } catch (error) {
        console.error('Error al actualizar titulado:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

export default router;
