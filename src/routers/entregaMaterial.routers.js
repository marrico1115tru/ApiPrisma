import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  const data = await prisma.entregaMaterial.findMany({
    include: {
      solicitud: true,
      usuarioResponsable: true,
    },
  });
  res.json(data);
});

router.post('/', async (req, res) => {
  const data = await prisma.entregaMaterial.create({
    data: req.body,
  });
  res.json(data);
});

router.put('/:id', async (req, res) => {
  const data = await prisma.entregaMaterial.update({
    where: { id: parseInt(req.params.id) },
    data: req.body,
  });
  res.json(data);
});

router.delete('/:id', async (req, res) => {
  const data = await prisma.entregaMaterial.delete({
    where: { id: parseInt(req.params.id) },
  });
  res.json(data);
});

export default router;
