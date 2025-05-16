import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Obtener todos los centros de formación
router.get('/', async (req, res) => {
  try {
    const data = await prisma.centroFormacion.findMany({
      include: {
        sedes: true,
        areas: true,
        municipios: true,
      },
    });
    res.json(data);
  } catch (error) {
    console.error('Error obteniendo centros de formación:', error);
    res.status(500).json({ error: 'Hubo un error al obtener los centros de formación.' });
  }
});

// Crear un nuevo centro de formación
router.post('/', async (req, res) => {
  try {
    const nuevoCentro = await prisma.centroFormacion.create({
      data: req.body,
    });
    res.status(201).json(nuevoCentro);
  } catch (error) {
    console.error('Error creando centro de formación:', error);
    res.status(500).json({ error: 'Hubo un error al crear el centro de formación.' });
  }
});

// Actualizar un centro de formación existente
router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  // Lista de campos permitidos para actualizar
  const allowedFields = [
    'nombre',
    'ubicacion',
    'telefono',
    'email',
    'fechaInicial',
    'fechaFinal'
  ];

  // Crear nuevo objeto con solo los campos válidos
  const dataToUpdate = {};
  for (const key of allowedFields) {
    if (req.body[key] !== undefined) {
      dataToUpdate[key] = req.body[key];
    }
  }

  try {
    const exists = await prisma.centroFormacion.findUnique({ where: { id } });
    if (!exists) {
      return res.status(404).json({ error: 'Centro de formación no encontrado' });
    }

    const updated = await prisma.centroFormacion.update({
      where: { id },
      data: dataToUpdate,
    });

    res.json(updated);
  } catch (error) {
    console.error('Error actualizando centro de formación:', error);
    res.status(500).json({ error: 'Hubo un error al actualizar el centro de formación.' });
  }
});
// Eliminar un centro de formación
router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });

  try {
    const exists = await prisma.centroFormacion.findUnique({ where: { id } });
    if (!exists) return res.status(404).json({ error: 'Centro de formación no encontrado' });

    await prisma.centroFormacion.delete({ where: { id } });
    res.json({ message: 'Centro de formación eliminado correctamente' });
  } catch (error) {
    console.error('Error eliminando centro de formación:', error);
    res.status(500).json({ error: 'Hubo un error al eliminar el centro de formación.' });
  }
});

export default router;
