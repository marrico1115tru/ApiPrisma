import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Crear un nuevo movimiento de material
router.post('/movimientosmateriales', async (req, res) => {
    try {
        const { tipo_movimiento, id_producto, cantidad, id_usuario, observaciones } = req.body;

        const nuevoMovimiento = await prisma.movimientosMateriales.create({
            data: {
                tipo_movimiento,
                id_producto,
                cantidad,
                id_usuario,
                observaciones
            }
        });

        res.json(nuevoMovimiento);
    } catch (error) {
        console.error('Error creando movimiento:', error);
        res.status(500).json({ error: 'Error creando movimiento' });
    }
});

// Obtener todos los movimientos de materiales
router.get('/movimientosmateriales', async (req, res) => {
    try {
        const movimientos = await prisma.movimientosMateriales.findMany();
        res.json(movimientos);
    } catch (error) {
        console.error('Error obteniendo movimientos:', error);
        res.status(500).json({ error: 'Error obteniendo movimientos' });
    }
});

// Actualizar un movimiento de material
router.put('/movimientosmateriales/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { tipo_movimiento, id_producto, cantidad, id_usuario, observaciones } = req.body;

        const movimientoActualizado = await prisma.movimientosMateriales.update({
            where: { id: parseInt(id) },
            data: {
                tipo_movimiento,
                id_producto,
                cantidad,
                id_usuario,
                observaciones
            }
        });

        res.json(movimientoActualizado);
    } catch (error) {
        console.error('Error actualizando movimiento:', error);
        res.status(500).json({ error: 'Error actualizando movimiento' });
    }
});

// Eliminar un movimiento de material
router.delete('/movimientosmateriales/:id', async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.movimientosMateriales.delete({
            where: { id: parseInt(id) }
        });

        res.json({ message: 'Movimiento eliminado correctamente' });
    } catch (error) {
        console.error('Error eliminando movimiento:', error);
        res.status(500).json({ error: 'Error eliminando movimiento' });
    }
});

export default router;
