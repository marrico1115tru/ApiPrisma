import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();


// ✅ LISTAR USUARIOS
router.get('/', async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany({
      include: {
        area: true,
        ficha: true,
        rol: true,
        solicitudes: true,
        entregas: true,
        historial: true,
      }
    });
    res.json(usuarios);
  } catch (error) {
    console.error('❌ Error al listar usuarios:', error);
    res.status(500).json({ message: 'Error al listar usuarios' });
  }
});

// ✅ CREAR USUARIO
router.post('/', async (req, res) => {
  try {
    const {
      nombre,
      apellido,
      cedula,
      telefono,
      email,
      cargo,
      areaId,
      fichaId,
      rolId,
      fechaInicial,
      fechaFinal
    } = req.body;

    if (!nombre || !apellido || !cedula || !telefono || !email || !cargo || !areaId || !fichaId || !rolId) {
      return res.status(400).json({ message: 'Faltan campos obligatorios.' });
    }

    const nuevoUsuario = await prisma.usuario.create({
      data: {
        nombre,
        apellido,
        cedula,
        telefono,
        email,
        cargo,
        areaId: Number(areaId),
        fichaId: Number(fichaId),
        rolId: Number(rolId),
        fechaInicial: fechaInicial ? new Date(fechaInicial) : new Date(),
        fechaFinal: fechaFinal ? new Date(fechaFinal) : new Date(),
      }
    });

    res.status(201).json(nuevoUsuario);
  } catch (error) {
    console.error('❌ Error al crear usuario:', error);
    res.status(500).json({ message: 'Error al crear usuario' });
  }
});

// ✅ EDITAR USUARIO
router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const {
      nombre,
      apellido,
      cedula,
      telefono,
      email,
      cargo,
      areaId,
      fichaId,
      rolId,
      fechaInicial,
      fechaFinal
    } = req.body;

    const usuarioActualizado = await prisma.usuario.update({
      where: { id },
      data: {
        nombre,
        apellido,
        cedula,
        telefono,
        email,
        cargo,
        areaId: Number(areaId),
        fichaId: Number(fichaId),
        rolId: Number(rolId),
        fechaInicial: fechaInicial ? new Date(fechaInicial) : new Date(),
        fechaFinal: fechaFinal ? new Date(fechaFinal) : new Date(),
      }
    });

    res.json(usuarioActualizado);
  } catch (error) {
    console.error('❌ Error al actualizar usuario:', error);
    res.status(500).json({ message: 'Error al actualizar usuario' });
  }
});

// ✅ ELIMINAR USUARIO
router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    await prisma.usuario.delete({
      where: { id }
    });

    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error('❌ Error al eliminar usuario:', error);
    res.status(500).json({ message: 'Error al eliminar usuario' });
  }
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
router.get('/usuarios-por-rol-actividad', async (req, res) => {
  try {
    const roles = await prisma.rol.findMany({
      include: {
        usuarios: {
          include: {
            _count: {
              select: {
                solicitudes: true,
                entregas: true,
              },
            },
          },
        },
      },
    });
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: 'Error al consultar usuarios por rol y actividad' });
  }
});

router.get('/usuarios-mayor-uso-productos', async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany({
      include: {
        _count: {
          select: {
            historial: true, 
          },
        },
      },
      orderBy: {
        historial: {
          _count: 'desc',
        },
      },
    });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al consultar uso de productos' });
  }
});

router.get('/usuarios-por-rol', async (req, res) => {
  try {
    // Obtenemos todos los roles con sus usuarios asociados
    const roles = await prisma.rol.findMany({
      select: {
        nombreRol: true,
        usuarios: {
          select: {
            id: true,
            nombre: true,
            apellido: true,
            email: true,
          }
        }
      }
    });

    //cantidad de usuarios por cada rol
    const resultado = roles.map((rol) => ({
      rol: rol.nombreRol,
      cantidadUsuarios: rol.usuarios.length,
      usuarios: rol.usuarios.map((usuario) => ({
        id: usuario.id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email
      }))
    }));

    res.json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener usuarios por rol.' });
  }
});



export default router;
