import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

/* ==============================
        LISTAR TODOS LOS ACCESOS
============================== */
router.get('/', async (req, res) => {
  try {
    const accesos = await prisma.acceso.findMany({
      include: {
        opcion: true,
        rol: true,
      },
      orderBy: {
        id: 'asc',
      },
    });
    res.json(accesos);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar los accesos', detalles: error.message });
  }
});

/* ==============================
        OBTENER ACCESO POR ID
============================== */
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    const acceso = await prisma.acceso.findUnique({
      where: { id },
      include: {
        opcion: true,
        rol: true,
      },
    });
    if (!acceso) {
      return res.status(404).json({ error: 'Acceso no encontrado' });
    }
    res.json(acceso);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el acceso', detalles: error.message });
  }
});

/* ==============================
        CREAR UN NUEVO ACCESO
============================== */
router.post('/', async (req, res) => {
  const { opcionId, rolId } = req.body;

  // Validación
  if (!opcionId || !rolId) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }

  try {
    const nuevoAcceso = await prisma.acceso.create({
      data: {
        opcionId,
        rolId,
      },
    });
    res.status(201).json(nuevoAcceso);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el acceso', detalles: error.message });
  }
});

/* ==============================
        ACTUALIZAR UN ACCESO
============================== */
router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { opcionId, rolId } = req.body;

  // Validación
  if (!opcionId || !rolId) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }

  try {
    const accesoActualizado = await prisma.acceso.update({
      where: { id },
      data: {
        opcionId,
        rolId,
      },
    });
    res.json(accesoActualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el acceso', detalles: error.message });
  }
});

/* ==============================
        ELIMINAR UN ACCESO
============================== */
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    await prisma.acceso.delete({
      where: { id },
    });
    res.json({ mensaje: 'Acceso eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el acceso', detalles: error.message });
  }
});

export default router;
