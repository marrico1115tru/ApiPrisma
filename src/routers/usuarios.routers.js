import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

/**
 * 🔹 Obtener todos los usuarios
 */
router.get('/', async (req, res) => {
  const usuarios = await prisma.usuario.findMany();
  res.json(usuarios);
});

/**
 * 🔹 Crear un nuevo usuario
 */
router.post('/', async (req, res) => {
  const usuario = await prisma.usuario.create({
    data: req.body,
  });
  res.json(usuario);
});

/**
 * 🔹 Actualizar un usuario por ID
 */
router.put('/:id', async (req, res) => {
  const usuario = await prisma.usuario.update({
    where: { id: parseInt(req.params.id) },
    data: req.body,
  });
  res.json(usuario);
});

/**
 * 🔹 Eliminar un usuario por ID
 */
router.delete('/:id', async (req, res) => {
  const usuario = await prisma.usuario.delete({
    where: { id: parseInt(req.params.id) },
  });
  res.json(usuario);
});

/**
 * 🔹 Obtener productos prestados por usuario
 */
router.get('/productos-prestados', async (req, res) => {
  try {
    const productosPrestados = await prisma.usuario.findMany({
      select: {
        id: true,
        nombre: true,
        apellido: true,
        historial: {
          select: {
            producto: {
              select: {
                nombre: true
              }
            },
            cantidad: true
          }
        }
      }
    });

    const data = productosPrestados.map((usuario) => ({
      usuario: `${usuario.nombre} ${usuario.apellido}`,
      totalProductosPrestados: usuario.historial.reduce((acc, item) => acc + item.cantidad, 0)
    }));

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener productos prestados por usuario.' });
  }
});

/**
 * 🔹 Obtener usuarios por rol
 */
router.get('/usuarios-por-rol', async (req, res) => {
  try {
    const usuariosPorRol = await prisma.rol.findMany({
      select: {
        nombreRol: true,
        usuarios: {
          select: {
            id: true,
            nombre: true,
            apellido: true
          }
        }
      }
    });

    const data = usuariosPorRol.map((rol) => ({
      rol: rol.nombreRol,
      cantidadUsuarios: rol.usuarios.length
    }));

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener usuarios por rol.' });
  }
});

export default router;
