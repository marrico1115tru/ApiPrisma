import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { verifyToken } from "../middlewares/verificarToken.js"; // (si no lo usas aquí, puedes eliminarlo)

const router = Router();
const prisma = new PrismaClient();

// 🧩 Obtener todos los usuarios
router.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await prisma.usuarios.findMany();
    res.json(usuarios);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ mensaje: "Error al obtener usuarios" });
  }
});

// 🧩 Crear nuevo usuario
router.post('/usuarios', async (req, res) => {
  try {
    const nuevoUsuario = await prisma.usuarios.create({ data: req.body });
    res.json(nuevoUsuario);
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ mensaje: "Error al crear usuario" });
  }
});

// 🧩 Eliminar usuario
router.delete('/usuarios/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const usuarioExistente = await prisma.usuarios.findUnique({
      where: { id: parseInt(id) },
    });

    if (!usuarioExistente) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    const usuarioEliminado = await prisma.usuarios.delete({
      where: { id: parseInt(id) },
    });

    res.json(usuarioEliminado);
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).json({ mensaje: "Error al eliminar usuario" });
  }
});

// 🧩 Actualizar usuario
router.put('/usuarios/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const usuarioExistente = await prisma.usuarios.findUnique({
      where: { id: parseInt(id) },
    });

    if (!usuarioExistente) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    const usuarioActualizado = await prisma.usuarios.update({
      where: { id: parseInt(id) },
      data: req.body,
    });

    res.json(usuarioActualizado);
  } catch (error) {
    console.error("Error actualizando usuario:", error);
    res.status(500).json({ mensaje: "Error actualizando usuario" });
  }
});

// 🧩 Login de usuarios (aunque esto podrías moverlo a su propio archivo login.router.js)
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"; // NO olvide importar bcrypt y jwt si los usas
const SECRET_KEY = "tu_clave_secreta"; // Cambia esto a tu clave real de JWT

router.post('/login', async (req, res) => {
  try {
    const { cedula, nombre } = req.body;

    if (!cedula || !nombre) {
      return res.status(400).json({ mensaje: "Cedula y Nombre son requeridos" });
    }

    const usuario = await prisma.usuarios.findUnique({
      where: { cedula: cedula }, // Ojo: Si cedula no es única en tu BD tendrás problemas
    });

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    // Como no tienes contraseñas reales, validamos por nombre
    if (usuario.nombre !== nombre) {
      return res.status(400).json({ mensaje: "Nombre incorrecto" });
    }

    // Generamos el token
    const token = jwt.sign(
      { id: usuario.id, cedula: usuario.cedula },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.json({ usuario, token });

  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
});

export default router;
