import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Listar
router.get('/', async (req, res) => {
  const titulados = await prisma.titulado.findMany();
  res.json(titulados);
});

// Crear
router.post('/', async (req, res) => {
  const { nombre, fechaInicial, fechaFinal } = req.body;
  const nuevoTitulado = await prisma.titulado.create({
    data: { nombre, fechaInicial: new Date(fechaInicial), fechaFinal: new Date(fechaFinal) }
  });
  res.json(nuevoTitulado);
});

// Editar
router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { nombre, fechaInicial, fechaFinal } = req.body;
  const actualizado = await prisma.titulado.update({
    where: { id },
    data: { nombre, fechaInicial: new Date(fechaInicial), fechaFinal: new Date(fechaFinal) }
  });
  res.json(actualizado);
});

// Eliminar
router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  await prisma.titulado.delete({ where: { id } });
  res.json({ message: 'Titulado eliminado correctamente' });
});

export default router;
