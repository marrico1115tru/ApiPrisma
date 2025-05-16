/*import { Router } from 'express';
const router = Router();
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Obtener todos los sitios con su tipoSitio
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const sitio = await prisma.sitio.findUnique({
      where: {
        id: parseInt(id), // ← ¡Muy importante! Prisma espera un número, no un string
      },
      include: {
        tipoSitio: true,
      },
    });

    if (!sitio) {
      return res.status(404).json({ error: "Sitio no encontrado" });
    }

    res.status(200).json(sitio);
  } catch (error) {
    console.error("Error al obtener sitio:", error);
    res.status(500).json({ error: "Error al obtener sitio", detalles: error.message });
  }
});

// Obtener un sitio por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const sitio = await prisma.sitio.findUnique({
      where: { id: parseInt(id) },
      include: { tipoSitio: true },
    });

    if (!sitio) return res.status(404).json({ error: 'Sitio no encontrado' });

    res.json(sitio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al buscar sitio' });
  }
});

// Crear un nuevo sitio
router.post('/', async (req, res) => {
  const { nombre, ubicacion, tipoSitioId } = req.body;
  try {
    const nuevoSitio = await prisma.sitio.create({
      data: {
        nombre,
        ubicacion,
        tipoSitioId,
      },
    });
    res.status(201).json(nuevoSitio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear sitio' });
  }
});

// Actualizar un sitio por ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, ubicacion, tipoSitioId, activo } = req.body;

  try {
    const sitioActualizado = await prisma.sitio.update({
      where: { id: parseInt(id) },
      data: {
        nombre,
        ubicacion,
        tipoSitioId,
        activo,
        fechaFinal: new Date(), // actualiza fechaFinal
      },
    });
    res.json(sitioActualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar sitio' });
  }
});

// Eliminar (desactivar lógicamente) un sitio por ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const sitio = await prisma.sitio.update({
      where: { id: parseInt(id) },
      data: {
        activo: false,
        fechaFinal: new Date(),
      },
    });
    res.json({ message: 'Sitio desactivado correctamente', sitio });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al desactivar sitio' });
  }
});

export default router;
*/