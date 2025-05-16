import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  try {
    const roles = await prisma.rol.findMany({
      include: {
        usuarios: true,
        accesos: true,
      },
      orderBy: {
        id: 'asc',
      },
    });
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar los roles', detalles: error.message });
  }
});


router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    const rol = await prisma.rol.findUnique({
      where: { id },
      include: {
        usuarios: true,
        accesos: true,
      },
    });
    if (!rol) {
      return res.status(404).json({ error: 'Rol no encontrado' });
    }
    res.json(rol);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el rol', detalles: error.message });
  }
});

/* ==============================
        CREAR UN NUEVO ROL
============================== */
router.post('/', async (req, res) => {
  const { nombreRol, fechaInicial, fechaFinal } = req.body;

  // Validación
  if (!nombreRol) {
    return res.status(400).json({ error: 'El nombre del rol es obligatorio' });
  }

  try {
    const nuevoRol = await prisma.rol.create({
      data: {
        nombreRol,
        fechaInicial: fechaInicial ? new Date(fechaInicial) : undefined,
        fechaFinal: fechaFinal ? new Date(fechaFinal) : undefined,
      },
    });
    res.status(201).json(nuevoRol);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el rol', detalles: error.message });
  }
});

/* ==============================
        ACTUALIZAR UN ROL
============================== */
router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { nombreRol, fechaInicial, fechaFinal } = req.body;

  // Validación
  if (!nombreRol) {
    return res.status(400).json({ error: 'El nombre del rol es obligatorio' });
  }

  try {
    const rolActualizado = await prisma.rol.update({
      where: { id },
      data: {
        nombreRol,
        fechaInicial: fechaInicial ? new Date(fechaInicial) : undefined,
        fechaFinal: fechaFinal ? new Date(fechaFinal) : undefined,
      },
    });
    res.json(rolActualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el rol', detalles: error.message });
  }
});

/* ==============================
        ELIMINAR UN ROL
============================== */
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    await prisma.rol.delete({
      where: { id },
    });
    res.json({ mensaje: 'Rol eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el rol', detalles: error.message });
  }
});

export default router;
